// @ts-nocheck

import axios from 'axios';
import { withSession } from '@/libs/session';
import { restAsyncHandler } from '@/libs/utils';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const REQUEST_FAILED = 'Request failed please try again';
async function handleGithubLogin(req, res) {
  const { code } = req.query;
  if (!code) {
    // redirect to github oauth page if no callback code
    return res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&allow_signup=false`
    );
  }
  const {
    data: { access_token }
  } = await axios.post(
    `https://github.com/login/oauth/access_token`,
    {
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code
    },
    {
      headers: {
        Accept: 'application/json'
      }
    }
  );
  if (!access_token) throw new Error(REQUEST_FAILED);
  const { data: userInfo } = await axios.get(`https://api.github.com/user`, {
    headers: {
      Authorization: `token ${access_token}`
    }
  });
  if (!userInfo) throw new Error(REQUEST_FAILED);
  if (!userInfo?.email) {
    try {
      const { data: userEmails } = await axios.get(
        `https://api.github.com/user/emails`,
        {
          headers: {
            Authorization: `token ${access_token}`
          }
        }
      );
      if (Array.isArray(userEmails)) {
        userInfo.email = userEmails
          .filter((i) => i.primary)
          .reduce((_, b) => b && b.email, null);
      }
    } catch (e) {} // nope
  }
  const output = {
    email: userInfo.email,
    name: userInfo.name,
    login: userInfo.login,
    avatar_url: userInfo.avatar_url,
    website: userInfo.blog,
    bio: userInfo.bio
  };
  req.session.set('user', output);
  await req.session.save();
  return res.redirect('/?login_type=github&success=1');
}
const handler = async (req, res) => {
  let currentUser = req.session.get('user');
  if (currentUser) {
    if (req.method === 'DELETE') {
      req.session.destroy();
      return res.json({ success: true, msg: 'Logout success' });
    }
    return res.json({ success: true, user: currentUser });
  } else {
    const { login_type } = req.query;
    switch (login_type) {
      case 'github':
        return handleGithubLogin(req, res);
      default:
        throw new Error(REQUEST_FAILED);
    }
  }
};

export default withSession(restAsyncHandler(handler));

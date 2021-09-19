import axios from 'axios';
import { withSession } from '@/libs/session';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
async function handler(req, res) {
  const currentUser = req.session.get('user');
  if (currentUser) {
    return res.json({
      success: false,
      msg: 'You have loggedIn as ' + currentUser.username
    });
  }
  const { code } = req.query;
  if (!code) {
    return res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&allow_signup=false`
    );
  }
  try {
    const requestToken = await axios.post(
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
    const access_token = requestToken?.data?.access_token;
    if (access_token) {
      const requestUserInfo = await axios.get(`https://api.github.com/user`, {
        headers: {
          Authorization: `token ${access_token}`
        }
      });

      let email = requestUserInfo?.data?.email;
      let username = requestUserInfo?.data?.login;
      let avatar_url = requestUserInfo?.data?.avatar_url;
      let fullname = requestUserInfo?.data?.name;
      let website_url = requestUserInfo?.data?.blog;
      if (!email) {
        // request user email
        try {
          const requestEmail = await axios.get(
            `https://api.github.com/user/emails`,
            {
              headers: {
                Authorization: `token ${access_token}`
              }
            }
          );
          if (requestEmail?.data) {
            for (let item of requestEmail.data) {
              if (item.primary) {
                email = item.email;
              }
            }
          }
        } catch (e) {} // nope
      }
      const _data = {
        type: 'github',
        username,
        fullname,
        email,
        website_url,
        avatar_url
      };
      req.session.set('user', _data);
      await req.session.save();

      return res.json({ success: true });
    } else {
      throw new Error('Failed to login');
    }
  } catch (e) {
    return res.json({ success: false, msg: e.message });
  }
}

export default withSession(handler);

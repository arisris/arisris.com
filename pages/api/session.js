import axios from 'axios';
import { withSession } from '@/libs/session';
import { documentDB } from '@/libs/astra';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
async function handleGithubAuth(req, res) {
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
    if (!access_token) throw new Error('Invalid request');
    const requestUserInfo = await axios.get(`https://api.github.com/user`, {
      headers: {
        Authorization: `token ${access_token}`
      }
    });
    if (!requestUserInfo?.data) throw new Error('Invalid request');

    let email = requestUserInfo.data?.email;
    let username = requestUserInfo.data?.login;
    let avatar_url = requestUserInfo.data?.avatar_url;
    let fullname = requestUserInfo.data?.name;
    let website = requestUserInfo.data?.blog;
    let bio = requestUserInfo.data?.bio;
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
    const collection = await documentDB('users');
    const storedUser = await collection.find(
      {
        username: { $eq: username }
      },
      { 'page-size': 1 }
    );
    let keys = Object.keys(storedUser);
    const _data = { isLoggedIn: true, userId: null };
    if (keys.length) {
      try {
        await collection.update(keys[0], {
          fullname,
          email,
          website,
          avatar_url,
          bio,
          updated_at: Date.now()
        });
      } catch (e) {
        /* fail to update but its still loggedIn */
      }
      _data.userId = keys[0];
    } else {
      let saved = await collection.insert({
        username,
        fullname,
        email,
        website,
        avatar_url,
        bio,
        password: null,
        isAdmin: false,
        created_at: Date.now()
      });
      if (saved) {
        _data.userId = saved.documentId;
      }
    }
    req.session.set('user', _data);
    await req.session.save();
    return res.json({ success: true, ..._data });
  } catch (e) {
    return res.json({ success: false, msg: e.message });
  }
}

export default withSession(async function(req, res) {
  const currentUser = req.session.get('user');
  if (req.method === 'GET') {
    if (currentUser) {
      return res.json({
        success: true,
        ...currentUser
      });
    }
    await handleGithubAuth(req, res);
    return;
  }
  if (req.method === 'DELETE' && currentUser) {
    req.session.destroy();
    return res.status(204).json({ success: true, msg: 'Session destroyed' });
  }
  return res.status(405).json({ success: false, msg: 'Method not allowed' });
});

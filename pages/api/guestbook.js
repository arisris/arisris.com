import { withSession } from '@/libs/session';
import { documentDB, documentToArray } from '@/libs/astra';
import * as v from 'vlid';

async function handleGet(req, res) {
  const gb = await documentDB('guestbook');
  const data = await gb.find(
    {
      status: { $eq: 'published' }
    }
  );
  if (Object.keys(data).length) {
    let out = documentToArray(data).map(i => {
      delete i.email;
      delete i.status;
      delete i.private;
      return i;
    })
    res.send({ success: true, data: out });
  } else {
    res.json({
      success: false,
      msg: 'something error'
    });
  }
}
async function handlePost(req, res) {
  const currentUser = req.session('user');
  if (!currentUser) {
    return res.json({ success: false, msg: 'You are not loggedIn' });
  }
  const gb = await documentDB('guestbook');
  const schema = v
    .object({
      private: v.boolean().required(),
      body: v
        .string()
        .min(3)
        .max(100)
        .required()
    })
    .cast();
  const result = v.validateSync(schema, req.body);
  if (result.isValid) {
    const data = await gb.insert({
      ...result.value,
      name: currentUser.fullname,
      email: currentUser.email,
      website: currentUser.website_url,
      avatar: currentUser.avatar_url,
      created_at: Date.now(),
      status: 'published'
    });
    if (data) {
      // created
      res.json({
        success: true,
        msg: 'Thanks for your comments wil approved soon.'
      });
    } else {
      res.json({ success: false, msg: 'database error' });
    }
  } else {
    res.json({ success: false, msg: 'validation error' });
  }
}

export default withSession(async function(req, res) {
  if (req.method === 'GET') return handleGet(req, res);
  if (req.method === 'POST') return handlePost(req, res);
  return req.json({ success: false, msg: 'No Method allowed.' });
});

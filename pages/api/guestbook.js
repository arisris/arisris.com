import { withSession } from '@/libs/session';
import { restAsyncHandler } from '@/libs/utils';
import { guestbookBase as DB } from '@/libs/deta';
import * as v from 'vlid';

async function handleGet(req, res) {
  const currentUser = req.session.get('user');
  const query = {};
  if (currentUser?.login !== 'arisris') {
    query.private = false;
  }

  const { items: data, last } = await DB.fetch(query, { limit: 100 });
  // remove last comment to ensure db not grow size
  if (last) await DB.delete(last);
  if (data.email && currentUser.login !== 'arisris') {
    delete data.email;
  }
  let sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  return res.json({ success: true, data: sortedData });
}
async function handlePost(req, res) {
  const currentUser = req.session.get('user');
  if (!currentUser) throw new Error('You are not loggedIn');
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
    await DB.put({
      ...result.value,
      email: currentUser.email,
      name: currentUser.name,
      login: currentUser.login,
      website: currentUser.website,
      avatar: currentUser.avatar_url,
      created_at: Date.now()
    });
    res.json({
      success: true,
      msg: 'Thanks for your comments.'
    });
  } else {
    throw new Error('Validation error');
  }
}
async function handleDelete(req, res) {
  const currentUser = req.session.get('user');
  try {
    if (!currentUser || !req.body?.key) throw Error;
    const comment = await DB.get(req.body?.key);
    if (
      comment.login === currentUser.login ||
      currentUser.login === 'arisris'
    ) {
      await DB.delete(req.body?.key);
      return res.json({ success: true, msg: 'Message deleted...' });
    }
    throw Error;
  } catch (e) {
    throw new Error('No message are deleted');
  }
}
export default withSession(async function(req, res) {
  switch (req.method) {
    case 'GET':
      return restAsyncHandler(handleGet)(req, res);
    case 'POST':
      return restAsyncHandler(handlePost)(req, res);
    case 'DELETE':
      return restAsyncHandler(handleDelete)(req, res);
    default:
      return res.json({ success: false, msg: 'No Method allowed.' });
  }
});

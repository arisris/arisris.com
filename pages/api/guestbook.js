import { withSession } from '@/libs/session';
import { documentDB } from '@/libs/astra';
import { postCommand } from '@/libs/upstash';
import { restAsyncHandler } from '@/libs/utils';
import * as v from 'vlid';

const transformResult = (data) =>
  data.result
    .map((i) => JSON.parse(i))
    .filter((i) => !i.private)
    .map((i) => {
      delete i.private;
      return i;
    });

async function handleGet(req, res) {
  const { data } = await postCommand(['LRANGE', 'guestbook_test', 0, 100]);
  const result = transformResult(data);
  return res.json({ success: true, data: result });
}
async function handlePost(req, res) {
  const session = req.session.get('user');
  if (!session) throw new Error('You are not loggedIn');
  const currentUser = await (await documentDB('users')).get(session.userId);
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
    const postData = JSON.stringify({
      ...result.value,
      name: currentUser.fullname,
      website: currentUser.website,
      avatar: currentUser.avatar_url,
      created_at: Date.now()
    });
    const { data } = await postCommand(['LPUSH', 'guestbook_test', postData]);
    if (data) {
      res.json({
        success: true,
        msg: 'Thanks for your comments.'
      });
    } else {
      throw new Error('Database error.. Try again');
    }
  } else {
    throw new Error('Validation error');
  }
}
export default withSession(async function(req, res) {
  if (req.method === 'GET') return restAsyncHandler(handleGet)(req, res);
  if (req.method === 'POST') return restAsyncHandler(handlePost)(req, res);
  return req.json({ success: false, msg: 'No Method allowed.' });
});

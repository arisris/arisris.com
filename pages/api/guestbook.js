import polka from 'polka';
import { collection } from '@/libs/astra';
import * as v from 'vlid';
import { objectToArray } from '@/libs/utils';

async function handleGet(req, res) {
  const { data, status } = await collection().get('guestbook', {
    where: { status: { $eq: 'published' } },
    'page-size': 20
  });
  if (status === 200) {
    res.send({ success: true, data: objectToArray(data.data) });
  } else {
    res.json({
      success: false,
      msg: 'dsomething error'
    });
  }
}
async function handlePost(req, res) {
  const schema = v
    .object({
      name: v
        .string()
        .min(3)
        .max(100),
      email: v.string().email(),
      website: v.string().url(),
      body: v
        .string()
        .min(3)
        .max(100)
    })
    .cast();
  const result = v.validateSync(schema, req.body);
  if (result.isValid) {
    const { status } = await collection().post('guestbook', {
      ...result.value,
      created_at: Date.now(),
      status: 'pending'
    });
    if (status === 201) {
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

const app = polka()
  .get('/api/guestbook', handleGet)
  .post('/api/guestbook', handlePost);

export default app.handler;

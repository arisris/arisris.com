import polka from 'polka';
import { collection } from '@/libs/astra';

export default polka().get('/api', async (req, res) => {
  const { data } = await collection().get("users");
  console.log(data);
  res.json({ msg: 'Hello World' });
}).handler;

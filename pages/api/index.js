import polka from 'polka';
import { collection } from '@/libs/astra';

export default polka().get('/api', async (req, res) => {
  const { data } = await collection().get('posts', { 'page-size': 20 });
  res.json(data);
}).handler;

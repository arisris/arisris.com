import polka from 'polka';
import { collection } from '@/libs/astra';

const basePath = '/api/auth';
const app = polka()
  .post(`${basePath}/provider/password`, async (req, res) => {
    const { data } = await collection().get('posts', { 'page-size': 20 });
    res.json(data);
  })
  .post(`${basePath}/provider/google`, async (req, res) => {
    const { data } = await collection().get('posts', { 'page-size': 20 });
    res.json(data);
  })
  .get(`${basePath}/getSession`, async (req, res) => {
    const { data } = await collection().get('posts', { 'page-size': 20 });
    res.json(data);
  })
  .get(`${basePath}/me`, async (req, res) => {
    const { data } = await collection().get('posts', { 'page-size': 20 });
    res.json(data);
  })
  .post(`${basePath}/me/update`, async (req, res) => {
    const { data } = await collection().get('posts', { 'page-size': 20 });
    res.json(data);
  });

export default async function handler(req, res) {
  app.handler(req, res);
}

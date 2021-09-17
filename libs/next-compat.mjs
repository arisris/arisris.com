import dotenv from 'dotenv';
import 'next/dist/next-server/server/node-polyfill-fetch.js'; // use global fetch
import path from 'path';

dotenv.config({
  path: path.join(process.cwd(), '.env.local')
});

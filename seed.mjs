import env from '@next/env';
import { createClient } from '@astrajs/rest';
import bcryptjs from 'bcryptjs';
env.loadEnvConfig(process.cwd());

const restClient = await createClient({
  astraDatabaseId: process.env.ASTRA_DB_ID,
  astraDatabaseRegion: process.env.ASTRA_DB_REGION,
  applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN
});
const basePath =
  '/api/rest/v2/namespaces/' + process.env.ASTRA_DB_NAMESPACE + '/collections';
const initialData = {
  users: [
    {
      username: 'arisris',
      fullname: 'Aris Riswanto',
      email: 'admin@arisris.vercel.app',
      website: 'https://arisris.vercel.app',
      password: await bcryptjs.hash('password', 10),
      avatar_url: 'https://0.gravatar.com/avatar/arisris',
      bio: 'Just Bio about Me',
      isAdmin: true
    }
  ],
  accounts: [],
  posts: [
    {
      title: 'Hello World',
      categories: ['uncategorized'],
      tags: ['hello', 'world', 'test', 'blog'],
      body: `<h3>Hello World</h3>\n<p>Just Test Post</p>`,
      hits: 0
    },
    {
      title: 'Hello World2',
      categories: ['uncategorized'],
      tags: ['hello', 'world', 'test', 'blog'],
      body: `<h3>Hello World2</h3>\n<p>Just Test Post2</p>`,
      hits: 0
    }
  ],
  guestbook: [
    {
      name: 'John Doe',
      email: 'jhondoe@example.net',
      avatar_url: 'https://0.gravatar.com/avatar/johndoe',
      website: 'https://arisris.vercel.app',
      body: "Hello there i'am John doe",
      status: 'published',
      private: 0
    },
    {
      name: 'John Cena',
      email: 'johncena@example.net',
      avatar_url: 'https://0.gravatar.com/avatar/johncena',
      website: 'https://arisris.vercel.app',
      body: "Hello there i'am John cena",
      status: 'published',
      private: 0
    }
  ]
};

// const test = await restClient.get(`${basePath}/users`, {
//   params: { 'page-size': 20 }
// });
// console.log(test);

for (let name in initialData) {
  let res = await restClient.get(`${basePath}/${name}`);
  if (res.status !== 404) {
    res = await restClient.delete(`${basePath}/${name}`);
    if (res.status === 204) {
      console.log('Drop ' + name);
    }
  }
  res = await restClient.post(`${basePath}`, { name });
  console.log('Create collection ' + name);
  if (res.status === 201) {
    for (let doc of initialData[name]) {
      doc = { ...doc, created_at: Date.now() };
      await restClient.post(`${basePath}/${name}`, doc);
    }
  }
  console.log('Collection ' + name + ' Created..');
}

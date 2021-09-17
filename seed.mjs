import './libs/next-compat.mjs';
import * as astra from './libs/astra.mjs';
import bcryptjs from 'bcryptjs';

const initialData = {
  users: [
    {
      username: 'arisris',
      password: await bcryptjs.hash('password', 10),
      email: 'aris@mail.kliksob.com',
      website: 'https://arisris.vercel.app',
      bio: 'Just Bio about Me'
    }
  ],
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
      name: 'Jhon Doe',
      body: "Hello there i'am Jhon doe",
      email: 'jhondoe@example.net',
      website: 'jhondoe.net'
    },
    {
      name: 'Jhon Cena',
      body: "Hello there i'am Jhon cena",
      email: 'jhoncena@example.net',
      website: 'jhoncena.net'
    }
  ]
};

for (let name in initialData) {
  //console.log(initialData[name])
  let res = await astra.collection().get(name);
  if (res.status !== 404) {
    res = await astra.collection().delete(name);
    if (res.status === 204) {
      console.log('Drop ' + name);
    }
  }
  res = await astra.collection().post('', { name });
  console.log('Create collection ' + name);
  if (res.status === 201) {
    for (let doc of initialData[name]) {
      await astra.collection().post(name, doc);
    }
  }
  console.log('Collection ' + name + ' Created..');
}

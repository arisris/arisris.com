import path from 'path';
import jetpack from 'fs-jetpack';
import matter from 'gray-matter';
import marked from 'marked';

// set current working directory
const { readAsync, findAsync } = jetpack.cwd(path.join(process.cwd(), 'data'));

export const getPaths = (pathname) => findAsync(pathname, { matching: '*.md' });

export async function findAll(pathname) {
  const output = [];
  for await (let filename of await findAsync(pathname, { matching: '*.md' })) {
    output.push(await getOne(filename));
  }
  output.sort((a, b) => new Date(b.createdAt) - new Date(b.createdAt));
  return output;
}

export async function getOne(filename) {
  if (filename.startsWith('/')) filename = `.${filename}`;
  let { content, data } = matter(await readAsync(filename));
  content = marked(content);
  return defaultMeta(data, {
    filename,
    createdAt: parseDate(data.createdAt),
    content
  });
}

function parseDate(dt) {
  try {
    dt = new Date(dt);
    return dt.toISOString();
  } catch (e) {
    return new Date('1990-01-01').toISOString();
  }
}
function defaultMeta() {
  return Object.assign(
    {
      title: '',
      author: '',
      createdAt: '',
      summary: '',
      image: ''
    },
    ...arguments
  );
}

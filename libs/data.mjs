import path from 'path';
import jetpack from 'fs-jetpack';
import matter from 'gray-matter';
import marked from 'marked';

// set current working directory
const { readAsync, findAsync } = jetpack.cwd(path.join(process.cwd(), 'data'));

export async function getPaths(pathname) {
  const output = [];
  for await (let filename of await findAsync(pathname, { matching: '*.md' })) {
    output.push(filename);
  }
  return output;
}

export async function findAll(pathname) {
  matter.clearCache();
  const output = [];
  for await (let filename of await findAsync(pathname, { matching: '*.md' })) {
    output.push(await parseFile(filename));
  }
  output.sort((a, b) => new Date(b.createdAt) - new Date(b.createdAt));
  return output;
}

export async function parseFile(filename) {
  if (filename.startsWith('/')) filename = `.${filename}`;
  matter.clearCache();
  const { content, data } = matter(await readAsync(filename));
  return defaultMeta(data, {
    filename,
    createdAt: parseDate(data.createdAt),
    content: marked(content)
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

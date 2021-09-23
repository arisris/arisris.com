import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';
import PostCard from '@/components/PostCard';
import { findAll } from '@/libs/data';
import path from 'path';

export default function PageHome({ posts }) {
  return (
    <Layout
      withHero={{
        title: 'Latest Posts',
        subtitle: 'Note: For now all post is just an for example'
      }}
    >
      <Head>
        <title>Blog Posts</title>
      </Head>
      <div className="px-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 dark:border-gray-900 rounded"
          >
            <div className="flex justify-between items-center">
              <Link href={`/posts/${post.filename}`}>
                <a className="w-8/12 text-purple-800 dark:text-blue-400">
                  <h3 className="text-xl truncate">{post.title}</h3>
                </a>
              </Link>
              <div className="w-4/12 text-[10px] text-right text-gray-500">
                <div>{post.author}</div>
                <div>{new Date(post.createdAt).toLocaleString()}</div>
              </div>
            </div>
            {post.image && <Image src={post.image} width="180" height="240" />}
            <div className="mt-2 text-xs text-gray-800 dark:text-gray-300">{post.summary}</div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
export async function getStaticProps() {
  const postLists = await findAll('posts', '*.md');
  const posts = [];
  for (let post of postLists) {
    const filename = path.parse(post.filename);
    const base = path.basename(filename.dir);
    delete post.content;
    post.filename = `${base}/${filename.name}`;
    posts.push(post);
  }
  return {
    props: {
      posts
    }
  };
}

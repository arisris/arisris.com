import Layout from 'components/Layout';
import Head from 'next/head';
import path from 'path';

export default function Posts({ post }) {
  return (
    <Layout
      withHero={{
        title: post.title,
        subtitle: (
          <>
            <div className="text-xs mt-2 text-gray-100">
              <span className="p-1">Author: {post.author},</span>
              <span className="p-1">
                Date: {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="mt-2 text-center text-sm">{post.summary}</div>
          </>
        )
      }}
    >
      <Head>
        <title>{post.title}</title>
      </Head>
      <div
        className="prose dark:prose-dark p-2 max-w-[640px] m-auto"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </Layout>
  );
}
export async function getStaticProps({ params: { slugs } }) {
  const { parseFile } = await import('@/libs/data');
  const post = await parseFile(`posts/${slugs[0]}/${slugs[1]}.md`);
  return {
    props: { post }
  };
}
export async function getStaticPaths() {
  const { getPaths } = await import('@/libs/data');
  const postLists = await getPaths('posts', '*.md');
  const paths = [];
  for (let filename of postLists) {
    const pathObject = path.parse(filename);
    const base = path.basename(pathObject.dir);
    paths.push({ params: { slugs: [base, pathObject.name] } });
  }
  return {
    paths,
    fallback: false
  };
}

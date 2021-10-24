import { useRef, useEffect } from 'react';
import Layout from 'components/Layout';
import Script from 'next/script';
import Head from 'next/head';
import { useTheme } from 'next-themes';
import path from 'path';

function highlightAll(el) {
  const resolve = () => 'hljs' in window;
  if (resolve()) {
    window.hljs.highlightElement(el);
  } else {
    const t = setInterval(function() {
      if (resolve()) {
        window.hljs.highlightElement(el);
        clearInterval(t);
      }
    });
  }
}

export default function Posts({ post }) {
  const { resolvedTheme } = useTheme();
  const contentRef = useRef(null);
  useEffect(() => {
    if (contentRef.current) {
      const domContainer = contentRef.current;
      domContainer.querySelectorAll('pre code').forEach(highlightAll);
    }
  }, [contentRef]);
  return (
    <Layout
      title={post.title}
      description={post.summary}
      date={post.createdAt}
      author={post.author}
      withHero={{
        title: post.title,
        subtitle: (
          <>
            <div className="text-xs mt-2">
              <span className="p-1">Author: {post.author},</span>
              <span className="p-1">
                Date: {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="mt-2 text-center">{post.summary}</div>
          </>
        )
      }}
    >
      <Head>
        <link
          rel="stylesheet"
          href={`https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.2.0/build/styles/${
            resolvedTheme === 'dark'
              ? 'base16/solarized-dark'
              : 'base16/solarized-light'
          }.min.css`}
        />
      </Head>
      <div
        ref={contentRef}
        className="prose dark:prose-dark p-2 max-w-[640px] m-auto"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <Script
        async
        src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.2.0/build/highlight.min.js"
      />
    </Layout>
  );
}
export async function getStaticProps({ params: { slugs } }) {
  const { getOne } = await import('@/libs/data');
  const post = await getOne(`posts/${slugs[0]}/${slugs[1]}.md`);
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

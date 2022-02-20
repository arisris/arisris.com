import Layout from "components/Layout";
import { getGistDetail, getGistList } from "lib/github";
import { friendlyDate } from "lib/utils";
import { GetStaticProps } from "next";
import marked from "marked";
import Script from "next/script";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

declare global {
  interface Window {
    hljs?: any;
  }
}

function highlightAll(el: Element) {
  const resolve = () => "hljs" in window;
  if (resolve()) {
    window.hljs.highlightElement(el);
  } else {
    const t = setInterval(function () {
      if (resolve()) {
        window.hljs.highlightElement(el);
        clearInterval(t);
      }
    });
  }
}

export default function Page({ data }) {
  const { resolvedTheme } = useTheme();
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (contentRef.current) {
      const domContainer = contentRef.current;
      domContainer.querySelectorAll("pre code").forEach((e) => highlightAll(e));
    }
  }, [contentRef]);
  //console.log(data)
  return (
    <Layout title="Code Snipet">
      <Head>
        <link
          rel="stylesheet"
          href={`https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.2.0/build/styles/${
            contentRef.current && resolvedTheme === "dark"
              ? "base16/dracula"
              : "base16/tomorrow"
          }.min.css`}
        />
      </Head>
      <div
        ref={contentRef}
        className="block mx-auto prose-sm prose dark:prose-invert prose-pre:border dark:prose-pre:border-gray-700 prose-pre:bg-gray-100 prose-pre:text-gray-900 dark:prose-pre:bg-gray-800 dark:prose-pre:text-gray-100"
      >
        <h1>{data.description}</h1>
        <div className="inline-flex gap-x-2 items-center font-thin text-lg flex-wrap">
          <small>Created: {friendlyDate(data.createdAt)},</small>
          <small>Updated: {friendlyDate(data.updatedAt)},</small>
          <small>({data.forks.totalCount}) fork,</small>
          <small>({data.stargazerCount}) star,</small>
          <small>({data.comments.totalCount}) comments,</small>
        </div>
        {data.files
          .filter((i: any) => i.extension === ".md")
          .map((i: any) => {
            return (
              <div
                key={i.name}
                dangerouslySetInnerHTML={{ __html: marked(i.text) }}
              />
            );
          })}
      </div>
      <Script
        async
        src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.2.0/build/highlight.min.js"
      />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = ctx.params.id as string;
  const data = await getGistDetail({ id });
  return {
    props: {
      data
    },
    revalidate: 3600
  };
};

export async function getStaticPaths() {
  const gists = await getGistList(),
    paths = [];
  for (let gist of gists.nodes) {
    paths.push({ params: { id: gist.name as string } });
  }
  return {
    paths,
    fallback: "blocking"
  };
}

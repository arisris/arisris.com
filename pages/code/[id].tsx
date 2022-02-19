import Layout from "components/Layout";
import { getGistDetail, getGistList } from "lib/github";
import { friendlyDate } from "lib/utils";
import { GetStaticProps } from "next";
import marked from "marked";
import path from "path";
import Script from "next/script";
import Head from "next/head";
import { useDarkMode } from "hooks/useDarkMode";
import { useEffect, useRef } from "react";

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
  const { dark } = useDarkMode();
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
            dark ? "base16/dracula" : "base16/github"
          }.min.css`}
        />
      </Head>
      <div
        ref={contentRef}
        className="block mx-auto prose dark:prose-dark prose-indigo"
      >
        <h1>{data.description}</h1>
        <div className="inline-flex gap-2 items-center font-thin text-lg">
          <small>Created: {friendlyDate(data.createdAt)},</small>
          <small>Updated: {friendlyDate(data.updatedAt)},</small>
          <small>({data.forks.totalCount}) fork,</small>
          <small>({data.stargazerCount}) star,</small>
          <small>({data.comments.totalCount}) comments,</small>
        </div>
        {data.files
          .filter((i) => i.extension === ".md")
          .map((i) => {
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

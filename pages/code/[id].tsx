import Layout from "components/Layout";
import { getGistDetail, getGistList } from "lib/github";
import { friendlyDate } from "lib/utils";
import { GetStaticProps } from "next";
import marked from "marked";
import { useRef } from "react";
import { useTheme } from "next-themes";
import { useExternal } from "ahooks";
import { Prism } from "prism-react-renderer";

export default function Page({ data }) {
  const { resolvedTheme } = useTheme();
  const contentRef = useRef<HTMLDivElement>(null);
  useExternal(
    `https://cdn.jsdelivr.net/npm/prismjs@1.27.0/themes/prism${
      resolvedTheme === "dark" ? "-dark" : "-solarizedlight"
    }.min.css`
  );
  return (
    <Layout title={data.description}>
      <div
        ref={contentRef}
        className="block mx-auto prose prose-pre:max-h-96 prose-code:bg-gray-100 dark:prose-invert dark:prose-pre:border-gray-800 dark:prose-pre:bg-gray-800 dark:prose-pre:text-gray-100 mb-8"
      >
        <h1>{data.description}</h1>
        <div className="inline-flex gap-x-2 items-center font-thin text-lg flex-wrap">
          <small>Created: {friendlyDate(data.createdAt)},</small>
          <small>Updated: {friendlyDate(data.updatedAt)},</small>
          <small>({data.forks.totalCount}) fork,</small>
          <small>({data.stargazerCount}) stars,</small>
          <small>({data.comments.totalCount}) comments,</small>
        </div>
        {data.files
          .filter((i: any) => i.extension === ".md")
          .map((i: any, key: number) => {
            return <RenderMarkdown key={key} md={i.text} />;
          })}
      </div>
    </Layout>
  );
}

function RenderMarkdown({ md }) {
  return (
    <div
      className="prose dark:prose-invert prose-pre:bg-gray-100"
      dangerouslySetInnerHTML={{
        __html: marked(md, {
          highlight: (code, lang) => {
            return Prism.highlight(
              code,
              Prism.languages[lang] ?? Prism.languages["markup"],
              lang ?? "markup"
            );
          }
        })
      }}
    />
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

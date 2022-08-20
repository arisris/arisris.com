import Layout from "components/Layout";
import { getGistDetail, getGistList } from "lib/github";
import { friendlyDate } from "lib/utils";
import { GetStaticProps } from "next";
import { Fragment, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import Highlight, { defaultProps } from "prism-react-renderer";
import draculaTheme from "prism-react-renderer/themes/dracula";
import githubTheme from "prism-react-renderer/themes/github";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";

export default function Page({ data }) {
  const { resolvedTheme } = useTheme();
  const contentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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
            return (
              <ReactMarkdown
                key={key}
                children={i.text}
                components={{
                  pre: ({ children }) => (
                    <pre className="bg-transparent">{children} </pre>
                  ),
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <Highlight
                        {...defaultProps}
                        theme={
                          mounted
                            ? resolvedTheme === "dark"
                              ? draculaTheme
                              : githubTheme
                            : githubTheme
                        }
                        code={String(children).replace(/\n$/, "")}
                        language={match[1] as any}
                      >
                        {({
                          className: clazz,
                          style,
                          tokens,
                          getTokenProps
                        }) => (
                          <code
                            className={clsx(
                              clazz,
                              "outline-none !bg-transparent"
                            )}
                            style={style}
                          >
                            {tokens.map((line, i) => (
                              <Fragment key={i}>
                                {line
                                  .filter((token) => !token.empty)
                                  .map((token, key) => (
                                    <span {...getTokenProps({ token, key })} />
                                  ))}
                                {"\n"}
                              </Fragment>
                            ))}
                          </code>
                        )}
                      </Highlight>
                    ) : (
                      <code>{children}</code>
                    );
                  }
                }}
              />
            );
          })}
      </div>
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

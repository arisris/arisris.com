import Layout from "components/Layout";
import marked from "marked";
import Image from "next/image";
import { friendlyDate } from "lib/utils";
import { getDiscussion } from "lib/github";
import { GetServerSideProps } from "next";

export default function Page({
  data,
  discussionId
}: {
  data: Record<string, any>;
  discussionId: number;
}) {
  return (
    <Layout title="Guestbook">
      <div className="grid grid-cols-2 gap-4 mx-6">
        <div
          className="col-span-2 text-sm lg:mx-6 font-light p-6 bg-blue-50 dark:bg-gray-800 border dark:border-gray-700 rounded-md prose-sm prose dark:prose-invert overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: marked(data.body) }}
        />
        <ul className="col-span-2 lg:mx-6 flex flex-col gap-6 mt-8 divide-y-2 dark:divide-gray-800">
          {data.comments.edges.map(({ node }) => {
            return (
              <li
                className="grid grid-cols-12 gap-x-4 sm:gap-0 sm:mx-8 py-4"
                key={node.id}
              >
                <div className="col-span-2 block relative content-center">
                  <Image
                    src={node.author.avatarUrl}
                    width={72}
                    height={72}
                    className="rounded-md"
                  />
                </div>
                <div className="col-span-10 flex justify-start items-start flex-col -mt-1">
                  <a
                    target={"_blank"}
                    href={node.author.url}
                    className="font-bold"
                  >
                    {node.author.login}
                  </a>
                  <small className="text-xs font-thin">
                    {friendlyDate(node.publishedAt)}
                  </small>
                  <div
                    className="font-light mt-2 text-sm"
                    dangerouslySetInnerHTML={{ __html: marked(node.body) }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetServerSideProps = async () => {
  const discussionId = 7;
  const data = await getDiscussion(discussionId);
  return {
    props: {
      discussionId,
      data
    },
    revalidate: 3600
  };
};

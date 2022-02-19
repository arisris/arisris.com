import { useRequest } from "ahooks";
import Layout from "components/Layout";
import { useEffect, useState } from "react";
import marked from "marked";
import Image from "next/image";
import { friendlyDate } from "lib/utils";
import { getDiscussion } from "lib/github";

export default function Page({
  data: initial,
  discussionId
}: {
  data: Record<string, any>;
  discussionId: number;
}) {
  const [data, setData] = useState(initial);
  const {
    data: freshData,
    loading,
    error
  } = useRequest(() =>
    fetch(`/api/gh/discussion?id=${discussionId}`).then((data) => data.json())
  );
  useEffect(() => {
    if (!loading && !error) setData(freshData);
  }, [freshData]);

  return (
    <Layout title="Guestbook">
      <div className="grid grid-cols-2 gap-4 mx-6 prose-indigo">
        <div
          className="col-span-2 text-sm lg:mx-6 font-light p-6 bg-blue-50 dark:bg-gray-800 border dark:border-gray-700 rounded-md"
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
                    className="font-light"
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

export async function getStaticProps() {
  const discussionId = 7;
  const data = await getDiscussion(discussionId);
  return {
    props: {
      discussionId,
      data
    }
  };
}

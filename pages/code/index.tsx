import Layout from "components/Layout";
import { getGistList } from "lib/github";
import { friendlyDate } from "lib/utils";
import { GetStaticProps } from "next";
import marked from "marked";
import Link from "next/link";

export default function Page({ data }) {
  return (
    <Layout title="Code Snipet">
      <div className="grid grid-cols-2 gap-4 mx-6 prose-indigo">
        <div
          className="col-span-2 text-sm lg:mx-6 font-light p-6 bg-blue-50 dark:bg-gray-800 border dark:border-gray-700 rounded-md"
          dangerouslySetInnerHTML={{
            __html: marked(
              "Public code snipet from [my gists](https://gist.github.com/arisris)"
            )
          }}
        />
        <ul className="col-span-2 lg:mx-6 flex flex-col gap-6 mt-4 divide-y-2 dark:divide-gray-800">
          {data.nodes.map((item: any) => {
            return (
              <li
                className="grid grid-cols-12 gap-x-4 sm:gap-0 sm:mx-8 py-4"
                key={item.name}
              >
                <div className="col-span-9 flex justify-start items-start flex-col -mt-1">
                  <Link href={`/code/${item.name}`}>
                    <a className="font-bold">{item.description}</a>
                  </Link>
                  <div className="inline-flex gap-2 items-center font-thin">
                    <small>Created: {friendlyDate(item.createdAt)}</small>
                    <small>Updated: {friendlyDate(item.updatedAt)}</small>
                  </div>
                </div>
                <div className="col-span-3 flex flex-col items-end font-thin text-sm">
                  <small>({item.forks.totalCount}) fork</small>
                  <small>({item.stargazers.totalCount}) star</small>
                  <small>({item.files.length}) file</small>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getGistList();
  return {
    props: {
      data
    },
    revalidate: 3600
  };
};

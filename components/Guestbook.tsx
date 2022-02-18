import { useRequest } from "ahooks";
import clsx from "clsx";
import Image from "next/image";
import marked from "marked";

export function Guestbook() {
  const { data, loading, error } = useRequest(() =>
    fetch("/api/gh/guestbook").then((data) => data.json())
  );
  console.log(data);
  return (
    <div className="p-2" id="guestbook">
      <h3 className="inline-flex border-b-4 text-2xl mb-6">Guestbook</h3>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[0, 1, 2, 3, 4].map((i, index) => (
            <div
              className="ring-2 ring-gray-400 dark:ring-gray-300 p-3 rounded-md text-xs hover:shadow-md hover:transition-transform hover:scale-[1.02] hover:duration-300"
              key={index}
            >
              <h3 className="mb-2 h-3 w-20 rounded-md bg-gray-400 dark:bg-gray-300"></h3>
              <p className="mb-2 h-3 w-20 rounded-md bg-gray-400 dark:bg-gray-300"></p>
              <div className="float-right gap-2 justify-end self-end h-3 w-20 rounded-md bg-gray-400 dark:bg-gray-300"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div>Error while loading data</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {data.comments.edges.map((i, index) => (
            <div
              className="relative ring-2 ring-gray-400 dark:ring-gray-300 p-3 rounded-md text-xs hover:shadow-md hover:transition-transform hover:scale-[1.02] hover:duration-300"
              title={i.node.author.login}
              key={index}
            >
              <h3 className="mb-2 font-bold">{i.node.author.login}</h3>
              <div
                className="truncate mb-2"
                dangerouslySetInnerHTML={{ __html: marked(i.node.body) }}
              />
              <div className="hidden absolute bottom-2 right-4 w-full gap-2 text-gray-500 justify-end content-end">
                <span> stars</span>
                <span>forks</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

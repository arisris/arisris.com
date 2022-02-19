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
    <div className="p-2 block" id="guestbook">
      <h3 className="inline-flex border-b-4 text-2xl mb-6">Guestbook</h3>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error while loading data</div>
        ) : (
          data.comments.edges.map((i, index) => (
            <div
              className="block font-light"
              title={i.node.author.login}
              key={index}
            >
              <div dangerouslySetInnerHTML={{ __html: marked(i.node.body) }} />
              <h3 className="">{i.node.author.login}</h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

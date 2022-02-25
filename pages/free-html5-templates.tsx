import { useRequest, useUpdateEffect } from "ahooks";
import Layout from "components/Layout";
import Pagination from "components/Pagination";
import { Skeleton } from "components/Utility";
import { NexusGenObjects } from "data/nexus/type";
import { useModal } from "hooks/useModal";
import { createGraphQLRequest, gql } from "lib/utils";
import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";
import {
  FaCircleNotch,
  FaDownload,
  FaExternalLinkAlt,
  FaLink
} from "react-icons/fa";
type ResponseType = NexusGenObjects["FreeTemplateQueryResponseType"];
const requester = createGraphQLRequest("/api/graphql");
const allTemplate = (page: number) =>
  requester(
    gql`
      query allFreeTemplate($page: Int) {
        allFreeTemplate(page: $page) {
          total
          totalPage
          nextPage
          data {
            id
            title
            slug
            source
            description
            image
            created_at
            updated_at
          }
        }
      }
    `,
    {
      page
    }
  ).then((data) => data?.allFreeTemplate);
const scrollToElementId = (id: string) => {
  let el = document.querySelector(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

const PreviewLink = ({ item }: { item: ResponseType["data"][0] }) => {
  const [loading, setLoading] = useState(false);
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    fetch(`https://arisris2.azib.workers.dev/getdemo/${item.slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.url) {
          window.open(data?.url, "_blank");
        } else {
          throw new Error("Upss!");
        }
      })
      .catch((e) => {
        alert("No Preview are found for this template :)");
      })
      .finally(() => setLoading(false));
  };
  return (
    <button
      onClick={handleClick}
      type="button"
      disabled={loading}
      className="px-4 py-2 bg-green-500 text-white inline-flex justify-center items-center gap-4 rounded-md"
    >
      <span>Preview</span>
      {loading ? (
        <FaCircleNotch size={16} className="animate-spin" />
      ) : (
        <FaExternalLinkAlt size={16} />
      )}
    </button>
  );
};

const DownloadLink = ({ item }: { item: ResponseType["data"][0] }) => {
  const [loading, setLoading] = useState(false);
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    new Promise((resolve) => {
      let t = setTimeout(() => {
        clearTimeout(t);
        return resolve(true);
      }, 3000);
      return t;
    })
      .then(() => {
        window.open(`https://freehtml5.co/download/?item=${item.slug}`);
      })
      .finally(() => setLoading(false));
  };
  return (
    <button
      onClick={handleClick}
      type="button"
      disabled={loading}
      className="px-4 py-2 bg-red-500 text-white inline-flex justify-center items-center gap-4 rounded-md"
    >
      <span>Download</span>
      {loading ? (
        <FaCircleNotch size={16} className="animate-spin" />
      ) : (
        <FaDownload size={16} />
      )}
    </button>
  );
};

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const dialog = useModal();
  const { data, loading, error, run } = useRequest<ResponseType, number[]>(
    allTemplate,
    {
      defaultParams: [1]
    }
  );
  useUpdateEffect(() => {
    run(currentPage);
    scrollToElementId("#navbar");
  }, [currentPage]);
  const handlePageChange = (e: number) => {
    setCurrentPage(e);
  };
  const handleItemClick = (
    item: ResponseType["data"][0],
    event: MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    const handlePreview = () => {
      const data = fetch(
        `multipurpose-free-fully-responsive-website-template-with-cta`
      );
    };
    dialog.create(
      <div className="prose dark:prose-invert">
        <div>
          <img src={item.image} className="w-full h-full" />
        </div>
        <div dangerouslySetInnerHTML={{ __html: item.description }} />
        <div className="grid grid-cols-2 gap-2 my-4">
          <PreviewLink item={item} />
          <DownloadLink item={item} />
        </div>
      </div>,
      item.title
    );
  };
  return (
    <Layout title="Free HTML5 Web Template">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="result-page">
        <div className="col-span-1 sm:col-span-2 border-b dark:border-gray-800 pb-4">
          <h1 className="text-2xl font-bold">Free HTML5 Web Templates</h1>
        </div>
        {loading ? (
          Array(10)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="flex flex-col gap-1 !bg-transparent">
                <Skeleton className="h-40" />
                <Skeleton className="h-8" />
              </div>
            ))
        ) : error ? (
          <div>Error While Loading Data</div>
        ) : (
          data?.data.map((item, index) => (
            <a
              key={index}
              href={`#${item.slug}`}
              onClick={(event) => handleItemClick(item, event)}
              className="flex flex-col gap-1 !bg-transparent p-2 hover:underline hover:transition-transform hover:scale-105 shadow-md dark:drop-shadow-xl"
            >
              <img src={item.image} className="h-40 rounded-md" />
              <h4 className="text-center">{item.title}</h4>
            </a>
          ))
        )}
      </div>
      <div className="float-right my-10">
        {loading && <Skeleton className="w-64 h-8" />}
        {!loading && !error && (
          <Pagination
            totalPage={data.totalPage}
            activePage={currentPage}
            changePage={handlePageChange}
          />
        )}
      </div>
    </Layout>
  );
}

import { usePrevious, useRequest, useUpdateEffect } from "ahooks";
import Layout from "components/Layout";
import Pagination from "components/Pagination";
import { Skeleton } from "components/Utility";
import { createGraphQLRequest, gql } from "lib/utils";
import Link from "next/link";
import { useState } from "react";

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
            # description
            image
            # created_at
            # updated_at
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
export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading, error, run } = useRequest(allTemplate, {
    defaultParams: [1]
  });
  useUpdateEffect(() => {
    run(currentPage);
    scrollToElementId("#navbar");
  }, [currentPage]);
  const handlePageChange = (e: number) => {
    setCurrentPage(e);
  };
  return (
    <Layout title="Free HTML5 Web Template">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="result-page">
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
            <Link href={item.source} key={index}>
              <a target={"_blank"} className="flex flex-col gap-1 !bg-transparent p-2 hover:underline hover:transition-transform hover:scale-105">
                <img src={item.image} className="h-40 rounded-md" />
                <h4 className="text-center shadow-md">{item.title}</h4>
              </a>
            </Link>
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

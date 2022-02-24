import React from "react";
import clsx from "clsx";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Pagination({
  prevLabel = "Prev",
  nextLabel = "Next",
  ...props
}: {
  prevLabel?: string;
  nextLabel?: string;
  activePage: number;
  totalPage: number;
  changePage: (n: number) => void;
}) {
  const { activePage, totalPage, changePage } = props;
  const renderPageNumber = () => {
    let startPage = activePage < 5 ? 1 : activePage - 4;
    const endPage = startPage + 4 < totalPage ? startPage + 4 : totalPage;
    const diff = startPage - endPage + 4;
    startPage -= startPage - diff > 0 ? diff : 0;
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <>
        {endPage > 5 && (
          <span className="font-sans font-normal text-sm mx-1">
            ...
          </span>
        )}
        {pages.map((page, i) => (
          <button
            className={clsx("p-2 rounded-md", {
              "bg-gray-800": activePage === page,
              "bg-gray-500": activePage !== page
            })}
            key={i}
            onClick={() => changePage(page)}
          >
            {page}
          </button>
        ))}
        {endPage < totalPage && (
          <span className="font-sans font-normal text-sm mx-1">
            ...
          </span>
        )}
      </>
    );
  };
  return (
    <div className="flex flex-row items-center flex-wrap gap-4">
      <button
        aria-label="Previous Page"
        className="inline-flex items-center rounded-md p-2 bg-gray-800"
        disabled={activePage === 1}
        onClick={() => changePage(activePage - 1)}
      >
        <FaChevronLeft className="font-medium mr-4" />
        <span className="mx-1">{prevLabel}</span>
      </button>
      {renderPageNumber()}
      <button
        aria-label="Next Page"
        className="inline-flex items-center rounded-md p-2 bg-gray-800"
        disabled={activePage === totalPage}
        onClick={() => changePage(activePage + 1)}
      >
        <span className="mx-1">{nextLabel}</span>
        <FaChevronRight className="font-medium ml-4" />
      </button>
    </div>
  );
}

export default Pagination;

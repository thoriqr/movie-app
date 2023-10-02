/* eslint-disable react/prop-types */

import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pagination = ({ data, isPreviousData, page, setPage }) => {
  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => prev - 1);

  const itemsPerPage = 20;
  const totalResults = data?.total_results || 0;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const visiblePageCount = 5; // Number of page buttons to show before and after the current page

  const generatePageNumbers = () => {
    const currentPage = page;
    const startPage = Math.max(
      1,
      currentPage - Math.floor(visiblePageCount / 2)
    );
    const endPage = Math.min(totalPages, startPage + visiblePageCount - 1);

    const pageNumbers = [];
    const isFirstPageVisible = startPage > 1;
    const isLastPageVisible = endPage < totalPages;

    if (isFirstPageVisible) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push("..."); // Ellipsis to indicate skipped pages
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (isLastPageVisible) {
      if (endPage < totalPages - 1) {
        pageNumbers.push("..."); // Ellipsis to indicate skipped pages
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center mt-4 mb-4 ">
      <div className="flex gap-2 md:gap-4 text-[#F5F9FF] text-sm md:text-base">
        <button
          onClick={prevPage}
          disabled={isPreviousData || page === 1}
          className=""
        >
         <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className="flex gap-1 md:gap-4">
          {generatePageNumbers().map((pg, index) => (
            <button
              onClick={() => {
                if (typeof pg === "number") {
                  setPage(pg);
                }
              }}
              key={index} // Use index as key since we might have non-numeric values
              disabled={isPreviousData}
              className={`px-2  ${
                pg === page ? " border-2 border-[#F5F9FF] rounded-sm" : ""
              }`}
            >
              {pg}
            </button>
          ))}
        </div>
        <button
          onClick={nextPage}
          disabled={isPreviousData || page === data?.total_pages}
          className="e"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

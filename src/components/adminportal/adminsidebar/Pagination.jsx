import React from 'react';

function Pagination({ currentPage, totalPages, goToPage }) {
  return (
    <div className="flex justify-center items-center gap-2 mt-6 text-sm text-gray-600">
      {/* Previous Button */}
      <button
        className={`flex items-center gap-1 px-3 py-1 rounded-md ${
          currentPage === 1 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'hover:bg-gray-200 hover:text-black'
        }`}
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <span>&larr;</span> Previous
      </button>

      {/* First Page */}
      {currentPage > 3 && (
        <button
          onClick={() => goToPage(1)}
          className="w-8 h-8 rounded-md hover:bg-gray-200"
        >
          1
        </button>
      )}

      {/* Ellipsis before current page */}
      {currentPage > 4 && <span className="px-1">...</span>}

      {/* Page Numbers around current page */}
      {[...Array(totalPages).keys()]
        .map(i => i + 1)
        .filter(
          page => 
            page === 1 ||
            page === totalPages ||
            Math.abs(page - currentPage) <= 2
        )
        .map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`w-8 h-8 rounded-md ${
              currentPage === page 
                ? 'bg-black text-white' 
                : 'hover:bg-gray-200'
            }`}
          >
            {page}
          </button>
        ))}

      {/* Ellipsis after current page */}
      {currentPage < totalPages - 3 && <span className="px-1">...</span>}

      {/* Last Page */}
      {currentPage < totalPages - 2 && (
        <button
          onClick={() => goToPage(totalPages)}
          className="w-8 h-8 rounded-md hover:bg-gray-200"
        >
          {totalPages}
        </button>
      )}

      {/* Next Button */}
      <button
        className={`flex items-center gap-1 px-3 py-1 rounded-md ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'hover:bg-gray-200 hover:text-black'
        }`}
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next <span>&rarr;</span>
      </button>
    </div>
  );
}

export default Pagination;
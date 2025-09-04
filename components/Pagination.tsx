"use client";

import React from "react";

type PaginationProps = {
  page: number;
  pageSize: number;
  totalCount?: number;
  totalPages?: number;
  hasPrevPage?: boolean;
  hasNextPage?: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
};

export default function Pagination({
  page,
  pageSize,
  totalCount,
  totalPages,
  hasPrevPage,
  hasNextPage,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
}: PaginationProps) {
  const canPrev = hasPrevPage ?? page > 1;
  const canNext = hasNextPage ?? (totalPages ? page < totalPages : true);

  return (
    <div className="flex items-center justify-between w-full py-4">
      <div className="flex items-center gap-2">
        <button
          className={`px-3 py-1 rounded-md border ${
            canPrev ? "bg-white hover:bg-gray-50" : "bg-gray-100 opacity-60 cursor-not-allowed"
          }`}
          onClick={() => canPrev && onPageChange(page - 1)}
          disabled={!canPrev}
        >
          Prev
        </button>
        <div className="px-2 text-sm text-gray-700">
          Page <span className="font-semibold">{page}</span>
          {totalPages ? (
            <>
              <span> of </span>
              <span className="font-semibold">{totalPages}</span>
            </>
          ) : null}
        </div>
        <button
          className={`px-3 py-1 rounded-md border ${
            canNext ? "bg-white hover:bg-gray-50" : "bg-gray-100 opacity-60 cursor-not-allowed"
          }`}
          onClick={() => canNext && onPageChange(page + 1)}
          disabled={!canNext}
        >
          Next
        </button>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-700">
        <span>Rows per page:</span>
        <select
          className="rounded-md border px-2 py-1"
          value={pageSize}
          onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
        >
          {pageSizeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {typeof totalCount === "number" ? (
          <span className="ml-3">Total: {totalCount}</span>
        ) : null}
      </div>
    </div>
  );
}



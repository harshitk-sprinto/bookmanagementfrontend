'use client'
import Card from "@/components/Card";
import Pagination from "@/components/Pagination";
import { BookQuery, fetchBooks } from "@/lib/api/books";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function Books() {
  const [data, setData] = useState<BookQuery | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const loadBooks = useCallback(async (nextPage: number, nextPageSize: number) => {
    const result = await fetchBooks({
      page: nextPage,
      pageSize: nextPageSize,
    });
    setData(result);
  }, []);

  useEffect(() => {
    loadBooks(page, pageSize);
  }, [page, pageSize, loadBooks])

  return (
    <>
      <div className="mx-4">
        <Card>
          <div className="mt-10 p-4 flex flex-col">
            <h4 className="font-bold"> Filter Books</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col p-2">
                <label className="font-bold text-gray-500 mb-2">
                  Search by Title
                </label>
                <input
                  className="rounded-2xl border-2 border-gray-400 p-2"
                  type="text"
                  placeholder="Enter book title..."
                ></input>
              </div>
              <div className="flex flex-col p-2">
                <label className="font-bold text-gray-500 mb-2">
                  Filter by Author
                </label>
                <select className="rounded-2xl border-2 border-gray-400 p-2">
                  <option value="">All Authors</option>
                </select>
              </div>
              <div className="flex flex-col p-2">
                <label className="font-bold text-gray-500 mb-2">
                  Publication Year
                </label>
                <input
                  className="rounded-2xl border-2 border-gray-400 p-2"
                  type="text"
                  placeholder="Year"
                ></input>
              </div>
              <div className="flex flex-col p-2">
                <label className="font-bold text-gray-500 mb-2 h-6"></label>
                <button className="p-2 rounded-2xl bg-blue-500 uppercase cursor-pointer active:border-2">
                  {" "}
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </Card>
        {data?.books.nodes.map((book) => (<Card key={book.id}>
          <div className="mt-10 p-4 flex flex-col">
            <h2 className="font-bold text-lg border-b-2 border-blue-900">
              {book.title}
            </h2>

            <div className="flex mt-4">
              <div className="text-gray-500 font-bold mr-2">Author: </div>
              <div>George Orwell</div>
            </div>
            <div className="flex mt-4">
              <div className="text-gray-500 font-bold mr-2">Published: </div>
              <div>1945</div>
            </div>
            <div className="mt-4">
              {book.description}
            </div>
            <div className="mt-4 flex">
              <button className="p-2 rounded-lg cursor-pointer bg-blue-400 mr-4">
                Edit
              </button>
              <button className="p-2 rounded-lg cursor-pointer bg-red-400">
                Delete
              </button>
            </div>
          </div>
        </Card>))}
        {data ? (
          <Pagination
            page={data.books.pageInfo.page}
            pageSize={data.books.pageInfo.pageSize}
            totalCount={data.books.pageInfo.totalCount}
            totalPages={data.books.pageInfo.totalPages}
            hasPrevPage={data.books.pageInfo.hasPrevPage}
            hasNextPage={data.books.pageInfo.hasNextPage}
            onPageChange={(p) => setPage(p)}
            onPageSizeChange={(ps) => { setPage(1); setPageSize(ps); }}
          />
        ) : null}
      </div>
    </>
  );
}

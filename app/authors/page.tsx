'use client'
import Card from "@/components/Card";
import Pagination from "@/components/Pagination";
import { AuthorQuery, fetchAuthors } from "@/lib/api/authors";
import { useCallback, useEffect, useState } from "react";


export default function Authors() {
  const [data, setData] = useState<AuthorQuery | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const loadAuthors = useCallback(async (nextPage: number, nextPageSize: number) => {
    const result = await fetchAuthors({
      page: nextPage,
      pageSize: nextPageSize,
    });
    setData(result);
  }, []);

  useEffect(() => {
    loadAuthors(page, pageSize);
  }, [page, pageSize, loadAuthors])
  return (
    <>
      <div className="mx-4">
        <Card>
          <div className="mt-10 p-4 flex flex-col">
            <h4 className="font-bold"> Filter Authors</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col p-2">
                <label className="font-bold text-gray-500 mb-2">
                  Search by Name
                </label>
                <input
                  className="rounded-2xl border-2 border-gray-400 p-2"
                  type="text"
                  placeholder="Enter author name..."
                ></input>
              </div>
              <div className="flex flex-col p-2">
                <label className="font-bold text-gray-500 mb-2">
                  Birth Year
                </label>
                <input
                  className="rounded-2xl border-2 border-gray-400 p-2"
                  type="number"
                  placeholder="Year"
                ></input>
              </div>
              <div className="flex flex-col p-2">
                <label className="font-bold text-gray-500"></label>
                <button className="p-2 rounded-2xl bg-blue-500 uppercase cursor-pointer active:border-2">
                  {" "}
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </Card>
        {data?.authors.nodes.map((author) => (
          <Card key={author.id}>
            <div className="mt-10 p-4 flex flex-col">
              <h2 className="font-bold text-lg border-b-2 border-blue-900">
                {author.name}
              </h2>

              <div className="flex mt-4">
                <div className="text-gray-500 font-bold mr-2">Born: </div>
                <div>{author.born_date?.toISOString()}</div>
              </div>
              <div className="flex mt-4">
                <div className="text-gray-500 font-bold mr-2">Books: </div>
                <div>{author.books.length}</div>
              </div>
              <div className="mt-4">
              {author.biography}
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
          </Card>
        ))}
        {data ? (
          <Pagination
            page={data.authors.pageInfo.page}
            pageSize={data.authors.pageInfo.pageSize}
            totalCount={data.authors.pageInfo.totalCount}
            totalPages={data.authors.pageInfo.totalPages}
            hasPrevPage={data.authors.pageInfo.hasPrevPage}
            hasNextPage={data.authors.pageInfo.hasNextPage}
            onPageChange={(p) => setPage(p)}
            onPageSizeChange={(ps) => { setPage(1); setPageSize(ps); }}
          />
        ) : null}
      </div>
    </>
  );
}

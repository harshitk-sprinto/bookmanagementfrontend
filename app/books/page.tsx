'use client'
import Card from "@/components/Card";
import Pagination from "@/components/Pagination";
import { BooksQuery, fetchBooks } from "@/lib/api/books";
import { Author, fetchAuthors } from "@/lib/api/authors";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createApolloClient } from "@/lib/apolloClient";
import { DELETE_BOOK } from "@/app/books/queries";

export default function Books() {
  const router = useRouter();
  const [data, setData] = useState<BooksQuery | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [titleFilter, setTitleFilter] = useState<string>("");
  const [authorFilter, setAuthorFilter] = useState<string[]>([]);
  const [publishedFromDate, setPublishedFromDate] = useState<string>("");
  const [publishedToDate, setPublishedToDate] = useState<string>("");
  const [authors, setAuthors] = useState<Author[]>([]);

  const loadBooks = useCallback(async (nextPage: number, nextPageSize: number) => {
    let from = publishedFromDate || undefined;
    let to = publishedToDate || undefined;
    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      if (fromDate > toDate) {
        const tmp = from;
        from = to;
        to = tmp;
      }
    }

    const filter = {
      title: titleFilter || undefined,
      authorIds: authorFilter.length ? authorFilter.map((v) => Number(v)) : undefined,
      publishedFrom: from,
      publishedTo: to,
    } as unknown;
    const result = await fetchBooks({
      page: nextPage,
      pageSize: nextPageSize,
      filter,
    });
    setData(result);
  }, [titleFilter, authorFilter, publishedFromDate, publishedToDate]);

  useEffect(() => {
    loadBooks(page, pageSize);
  }, [page, pageSize, loadBooks])

  useEffect(() => {
    setPage(1);
  }, [titleFilter, authorFilter, publishedFromDate, publishedToDate]);

  async function handleDeleteBook(id: number) {
    if (!confirm("Are you sure you want to delete this book?")) return;
    const client = createApolloClient();
    await client.mutate({ mutation: DELETE_BOOK, variables: { id } });
    await loadBooks(page, pageSize);
  }

  useEffect(() => {
    (async () => {
      const result = await fetchAuthors({ page: 1, pageSize: 1000 });
      setAuthors(result?.authors.nodes ?? []);
    })();
  }, []);

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
                  value={titleFilter}
                  onChange={(e) => setTitleFilter(e.target.value)}
                ></input>
              </div>
              <div className="flex flex-col p-2">
                <label className="font-bold text-gray-500 mb-2">
                  Filter by Author
                </label>
                <select
                  className="rounded-2xl border-2 border-gray-400 p-2"
                  multiple
                  value={authorFilter}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions).map((o) => o.value);
                    setAuthorFilter(selected);
                  }}
                >
                  {authors.map((a) => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col p-2">
                <label className="font-bold text-gray-500 mb-2">
                  Published From
                </label>
                <input
                  className="rounded-2xl border-2 border-gray-400 p-2"
                  type="date"
                  value={publishedFromDate}
                  onChange={(e) => setPublishedFromDate(e.target.value)}
                ></input>
              </div>
              <div className="flex flex-col p-2">
                <label className="font-bold text-gray-500 mb-2">
                  Published To
                </label>
                <input
                  className="rounded-2xl border-2 border-gray-400 p-2"
                  type="date"
                  value={publishedToDate}
                  onChange={(e) => setPublishedToDate(e.target.value)}
                ></input>
              </div>
              {/* <div className="flex flex-col p-2">
                <label className="font-bold text-gray-500 mb-2 h-6"></label>
                <button
                  className="p-2 rounded-2xl bg-blue-500 uppercase cursor-pointer active:border-2"
                  onClick={() => { setPage(1); loadBooks(1, pageSize); }}
                >
                  {" "}
                  Apply Filters
                </button>
              </div> */}
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
              <div>{book.authors?.map(a => a.name).join(', ') || 'Unknown'}</div>
            </div>
            <div className="flex mt-4">
              <div className="text-gray-500 font-bold mr-2">Published: </div>
              <div>{(() => { try { return new Date(book.published_date).getFullYear(); } catch { return '—'; } })()}</div>
            </div>
            <div className="mt-4">
              {book.description}
            </div>
            <div className="mt-4 flex">
              <button className="p-2 rounded-lg cursor-pointer bg-blue-400 mr-4" onClick={() => router.push(`/books/edit/${book.id}`)}>
                Edit
              </button>
              <button className="p-2 rounded-lg cursor-pointer bg-red-400" onClick={() => handleDeleteBook(book.id)}>
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

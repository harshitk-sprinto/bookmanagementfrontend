import { createApolloClient } from "@/lib/apolloClient";
import { GET_BOOKS } from "@/app/books/queries";

export type PageInfo = {
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type Author = {
  id: number;
  name: string;
  biography: string;
  born_date: Date;
};

export type Book = {
  id: number;
  title: string;
  description: string;
  published_date: Date;
  authors: Author[];
};

export type BookConnection = {
  nodes: Book[];
  pageInfo: PageInfo;
};

export type BookQuery = {
  books: BookConnection;
};

export async function fetchBooks(variables: { page?: number; pageSize?: number; filter?: unknown }): Promise<BookQuery | undefined> {
  const client = createApolloClient();
  const { data } = await client.query<BookQuery>({
    query: GET_BOOKS,
    variables,
  });
  return data;
}



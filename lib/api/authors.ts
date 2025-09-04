import { createApolloClient } from "@/lib/apolloClient";
import { GET_AUTHORS } from "@/app/authors/queries";

export type PageInfo = {
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type Book = {
  id: number;
  title: string;
  description: string;
  published_date: Date;
};

export type Author = {
  id: number;
  name: string;
  biography: string;
  born_date: Date;
  books: Book[];
};

export type AuthorConnection = {
  nodes: Author[];
  pageInfo: PageInfo;
};

export type AuthorQuery = {
  authors: AuthorConnection;
};

export async function fetchAuthors(variables: { page?: number; pageSize?: number; filter?: unknown }): Promise<AuthorQuery | undefined> {
  const client = createApolloClient();
  const { data } = await client.query<AuthorQuery>({
    query: GET_AUTHORS,
    variables,
  });
  return data;
}



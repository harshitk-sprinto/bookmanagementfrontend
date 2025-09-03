import { gql } from "@apollo/client";

export const GET_AUTHORS = gql`
  query GetAuthors($page: Int, $pageSize: Int, $filter: AuthorFilter) {
    authors(page: $page, pageSize: $pageSize, $filter: $filter) {
      nodes {
        id
        name
        biography
        born_date
        books {
          title
        }
      }
      pageInfo {
        page
        pageSize
        totalPages
        totalCount
        hasNextPage
        hasPrevPage
      }
    }
  }
`;

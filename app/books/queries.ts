import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query GetBooks($page: Int, $pageSize: Int, $filter: BookFilter){
    books(page: $page, pageSize: $pageSize, filter: $filter) {
      nodes {
        id
        title
        description
        published_date
        authors {
          name
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

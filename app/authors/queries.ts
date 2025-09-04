import { gql } from "@apollo/client";

export const GET_AUTHORS = gql`
  query GetAuthors($page: Int, $pageSize: Int, $filter: AuthorFilter) {
    authors(page: $page, pageSize: $pageSize, filter: $filter) {
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

export const GET_AUTHOR = gql`
  query GetAuthor($id: ID) {
    author(id: $id) {
      id
      name
      biography
      born_date
      books { id title }
    }
  }
`;

export const CREATE_AUTHOR = gql`
  mutation CreateAuthor($name: String!, $biography: String, $born_date: Date) {
    createAuthor(name: $name, biography: $biography, born_date: $born_date) {
      id
      name
      biography
      born_date
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation UpdateAuthor($id: ID!, $name: String, $biography: String, $born_date: Date) {
    updateAuthor(id: $id, name: $name, biography: $biography, born_date: $born_date) {
      id
      name
      biography
      born_date
    }
  }
`;

export const DELETE_AUTHOR = gql`
  mutation DeleteAuthor($id: ID!) {
    deleteAuthor(id: $id)
  }
`;
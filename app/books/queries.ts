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
        metadata {
          averageRating
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


export const GET_BOOK = gql`
  query GetBook($id: ID) {
    book(id: $id) {
      id
      title
      description
      published_date
      authors { id name }
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $description: String, $published_date: Date, $authorIds: [Int!]) {
    createBook(title: $title, description: $description, published_date: $published_date, authorIds: $authorIds) {
      id
      title
      description
      published_date
      authors { id name }
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $title: String, $description: String, $published_date: Date, $authorIds: [Int!]) {
    updateBook(id: $id, title: $title, description: $description, published_date: $published_date, authorIds: $authorIds) {
      id
      title
      description
      published_date
      authors { id name }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`;

import { gql } from "apollo-boost";

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $genre: String!, $authorId: ID!) {
    addBook(title: $title, genre: $genre, authorId: $authorId) {
      id
    }
  }
`;

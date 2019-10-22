import { gql } from "apollo-boost";

export const GET_BOOK = gql`
  query($id: ID) {
    book(id: $id) {
      id
      title
      genre
      author {
        id
        name
        age
        books {
          id
          title
          genre
        }
      }
    }
  }
`;

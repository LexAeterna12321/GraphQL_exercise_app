import { gql } from "apollo-boost";
export const GET_BOOKS = gql`
  {
    books {
      title
      id
    }
  }
`;

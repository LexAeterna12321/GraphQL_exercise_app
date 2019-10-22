import { gql } from "apollo-boost";

export const GET_AUTHORS = gql`
  {
    authors {
      id
      name
    }
  }
`;

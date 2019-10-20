import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);
  if (error) {
    return <p>{error.message}</p>;
  }

  return !loading ? (
    <div>
      <ul className="book-list">
        {data.books.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </div>
  ) : (
    <div>Loading books...</div>
  );
}

const getBooksQuery = gql`
  {
    books {
      title
      id
    }
  }
`;

export default BookList;

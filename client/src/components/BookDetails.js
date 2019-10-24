import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_BOOK } from "../queries";

function BookDetails({ currentBookId }) {
  const { data, loading } = useQuery(GET_BOOK, {
    variables: { id: currentBookId }
  });

  const renderDetails = () => {
    const {
      title,
      genre,
      author: { name, age, books }
    } = data.book;

    return (
      <div>
        <h3>Title: {title}</h3>
        <i>Genre: {genre}</i>
        <div>
          <h4>
            Author: {name}, age: {age}
          </h4>
          <ul>
            All books by this author:{" "}
            {books.map(({ title, id }) => (
              <li key={id}>{title}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="book-details">
      {!loading && data ? (
        renderDetails()
      ) : (
        <div>Click a book to display details</div>
      )}
    </div>
  );
}

export default BookDetails;

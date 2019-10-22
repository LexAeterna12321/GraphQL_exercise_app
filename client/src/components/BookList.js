import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_BOOKS } from "../queries";
import BookDetails from "./BookDetails";
function BookList() {
  const [currentBookId, setCurrentBookId] = useState("");
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (error) return <p>{error.message}</p>;

  const renderBooks = () => (
    <ul className="book-list">
      {data.books.map(({ id, title }) => (
        <li key={id} onClick={() => setCurrentBookId(id)}>
          {title}
        </li>
      ))}
    </ul>
  );

  return !loading ? (
    <div>
      {renderBooks()}
      <BookDetails id={currentBookId} />
    </div>
  ) : (
    <div>Loading books...</div>
  );
}

export default BookList;

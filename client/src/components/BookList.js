import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_BOOKS } from "../queries";
import BookDetails from "./BookDetails";
import { Ul, Li } from "./styledComponents";
function BookList() {
  const [currentBookId, setCurrentBookId] = useState("");
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (error) return <p>{error.message}</p>;

  const renderBooks = () => (
    <Ul className="book-list">
      {data.books.map(({ id, title }) => (
        <Li key={id} onClick={() => setCurrentBookId(id)}>
          {title}
        </Li>
      ))}
    </Ul>
  );

  return !loading ? (
    <div>
      {renderBooks()}
      <BookDetails currentBookId={currentBookId} />
    </div>
  ) : (
    <div>Loading books...</div>
  );
}

export default BookList;

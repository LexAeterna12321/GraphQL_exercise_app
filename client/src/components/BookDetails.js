import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_BOOK } from "../queries";
import { Ul, Li, Container } from "./styledComponents";
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
      <Container>
        <h3>Title: {title}</h3>
        <i>Genre: {genre}</i>
        <div>
          <h4>
            Author: {name}, age: {age}
          </h4>
          <Ul>
            All books by this author:{" "}
            {books.map(({ title, id }) => (
              <Li key={id}>{title}</Li>
            ))}
          </Ul>
        </div>
      </Container>
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

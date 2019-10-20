import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";

function AddBook() {
  const [book, setBook] = useState({});

  const { data, loading, error } = useQuery(GET_AUTHORS);

  const [addBook] = useMutation(ADD_BOOK);

  if (error) {
    return <p>{error.message}</p>;
  }

  const displayOptions = () => {
    const { authors } = data;

    return authors.map(({ name, id }) => (
      <option key={id} value={name}>
        {name}
      </option>
    ));
  };

  const handleChange = e => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const { title, genre, authorName } = book;

    const author = data.authors.filter(author => authorName === author.name);

    addBook({
      variables: { title, genre, authorId: author[0].id }
    });
    setBook({});
  };

  return (
    <form className="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>
          Book name:
          <input type="text" name="title" onChange={handleChange} />
        </label>
      </div>
      <div className="field">
        <label>
          Genre:
          <input type="text" name="genre" onChange={handleChange} />
        </label>
      </div>
      <div className="field">
        <label htmlFor="pet-select">Author: </label>
        <select
          name="pets"
          id="pet-select"
          onChange={handleChange}
          name="authorName"
        >
          <option value="">Select author</option>
          {!loading && displayOptions()}
        </select>
      </div>
      <button type="submit">+</button>
    </form>
  );
}

const GET_AUTHORS = gql`
  {
    authors {
      id
      name
    }
  }
`;

const ADD_BOOK = gql`
  mutation addBook($title: String!, $genre: String!, $authorId: ID!) {
    addBook(title: $title, genre: $genre, authorId: $authorId) {
      id
    }
  }
`;

export default AddBook;

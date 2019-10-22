import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { ADD_BOOK } from "../mutations";
import { GET_AUTHORS, GET_BOOKS } from "../queries";

function AddBook() {
  const [book, setBook] = useState({ title: "", genre: "", authorId: "" });
  const { data, loading, error } = useQuery(GET_AUTHORS);
  const [addBook] = useMutation(ADD_BOOK);

  if (error) return <p>{error.message}</p>;

  const displayOptions = () =>
    data.authors.map(({ name, id }) => (
      <option key={id} value={id}>
        {name}
      </option>
    ));

  const handleChange = e =>
    setBook({ ...book, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    addBook({
      variables: { ...book },
      refetchQueries: [{ query: GET_BOOKS }]
    });
    setBook({ title: "", genre: "", authorId: "" });
  };

  const { authorId, title, genre } = book;
  return (
    <form className="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>
          Book name:
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={title}
          />
        </label>
      </div>
      <div className="field">
        <label>
          Genre:
          <input
            type="text"
            name="genre"
            onChange={handleChange}
            value={genre}
          />
        </label>
      </div>
      <div className="field">
        <label htmlFor="pet-select">Author: </label>
        <select
          name="pets"
          id="pet-select"
          onChange={handleChange}
          name="authorId"
          value={authorId}
        >
          <option value="">Select author</option>
          {!loading && displayOptions()}
        </select>
      </div>
      <button type="submit">+</button>
    </form>
  );
}

export default AddBook;

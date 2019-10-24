import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { ADD_BOOK } from "../mutations";
import { GET_AUTHORS, GET_BOOKS } from "../queries";

import { Button, Input, Label, Select, Form } from "./styledComponents";

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
    <Form className="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <Label>
          Book name:
          <Input
            type="text"
            name="title"
            onChange={handleChange}
            value={title}
          />
        </Label>
      </div>
      <div className="field">
        <Label>
          Genre:
          <Input
            type="text"
            name="genre"
            onChange={handleChange}
            value={genre}
          />
        </Label>
      </div>
      <div className="field">
        <Label htmlFor="pet-select">Author: </Label>
        <Select
          name="pets"
          id="pet-select"
          onChange={handleChange}
          name="authorId"
          value={authorId}
        >
          <option value="">Select author</option>
          {!loading && displayOptions()}
        </Select>
        <Button type="submit">+</Button>
      </div>
    </Form>
  );
}

export default AddBook;

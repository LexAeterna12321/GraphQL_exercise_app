import React from "react";
import BookList from "./components/BookList";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

function App() {
  const { loading, error, data } = useQuery(query);
  console.log(loading, data);
  return (
    <div className="App">
      <h1>Ninja's Reading List</h1>
      <BookList />
    </div>
  );
}

const query = gql`
  {
    authors {
      id
    }
  }
`;
export default App;

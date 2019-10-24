import styled from "styled-components";

export const Input = styled.input`
  background: rgb(219, 112, 147);
  color: white;
  margin: 1em;
  font-size: 1.3rem;
  width: 400px;
  padding: 7px;
  outline: none;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.1s;

  :hover,
  :focus,
  :active {
    background: rgb(229, 122, 167);
  }
  ::placeholder {
    color: inherit;
  }
`;

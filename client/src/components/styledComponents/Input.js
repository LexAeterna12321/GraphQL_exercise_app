import styled from "styled-components";

export const Input = styled.input`
  background: #30336b;
  color: white;
  margin: 1em;
  font-size: 1.3rem;
  width: 90%;
  padding: 7px;
  outline: none;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.1s;

  :hover,
  :focus,
  :active {
    background: #130f40;
  }
  ::placeholder {
    color: inherit;
  }
`;

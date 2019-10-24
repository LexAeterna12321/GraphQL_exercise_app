import styled from "styled-components";

export const Button = styled.button`
  background: rgb(219, 112, 147);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid lightgray;
  color: white;
  margin: 0 1em;
  font-size: 1.6rem;
  line-height: 20px;
  cursor: pointer;
  transition: background 0.1s;

  :hover {
    background: rgb(229, 122, 167);
  }
`;

import styled from "styled-components";
import arrow from "../../assets/ico/arrow-down.png";

export const Select = styled.select`
  background-color: #95afc0;
  margin: 1em;
  font-size: 1.3rem;
  padding: 7px 30px 7px 7px;
  cursor: pointer;
  color: white;
  border: none;
  border-radius: 2px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url(${arrow});
  background-size: 10%;
  background-blend-mode: overlay;
  background-position: center right;
  background-repeat: no-repeat;
`;

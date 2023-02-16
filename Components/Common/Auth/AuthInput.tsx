import styled from "styled-components";

const AuthInput = styled.input`
  width: 26.5rem;
  height: 2.5rem;

  border-width: 0 0 1px;
  border-color: black;

  font-size: 1rem;

  :focus {
    border-color: blue;
    border-width: 0 0 2px;
  }
`;

export default AuthInput;

import styled from "styled-components";

const LoginButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0.625rem;

  width: 27.1875rem;
  height: 3.6875rem;

  border: 0.0625rem solid #333333;
  border-radius: 6.25rem;

  flex: none;
  order: 0;
  flex-grow: 0;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-size: 1.125rem;

  display: flex;
  align-items: center;
  text-align: center;

  cursor: pointer;

  :hover {
    background-color: lightgray;
  }
`;

export default LoginButton;

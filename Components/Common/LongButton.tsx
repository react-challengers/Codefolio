import styled from "styled-components";

const LongButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.625rem;

  width: 27.1875rem;
  height: 3.6875rem;

  border: 1px solid #333333;
  border-radius: 6.25rem;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-size: 1.125rem;

  cursor: pointer;

  :hover {
    background-color: lightgray;
  }
`;

export default LongButton;

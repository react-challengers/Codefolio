import styled from "styled-components";

const AuthInput = styled.input`
  ${({ theme }) => theme.fonts.body14};
  caret-color: ${({ theme }) => theme.colors.gray7};

  width: 27.25rem;
  height: 2.5rem;

  box-sizing: border-box;

  border-width: 0 0 1px;
  border-color: ${({ theme }) => theme.colors.gray7};
  outline: none;

  padding: 0.625rem 1rem 0.625rem 1rem;

  background-color: ${({ theme }) => theme.colors.gray11};
`;

export default AuthInput;

import styled from "styled-components";

interface AuthInputProps {
  validate: string;
}

const AuthInput = styled.input<AuthInputProps>`
  ${({ theme }) => theme.fonts.body14Medium};
  caret-color: ${({ theme }) => theme.colors.gray7};

  width: 27.25rem;
  height: 2.5rem;

  box-sizing: border-box;

  border-width: 0 0 1px;
  border-color: ${(props) =>
    props.validate === ""
      ? props.theme.colors.gray7
      : props.theme.colors.messageError};

  outline: none;

  color: ${({ theme }) => theme.colors.white};

  padding: 0.625rem 1rem 0.625rem 1rem;

  background-color: ${({ theme }) => theme.colors.gray11};

  @media (max-width: 768px) {
    width: 20rem;
  }
`;

export default AuthInput;

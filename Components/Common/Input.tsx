import { ChangeEvent } from "react";
import styled from "styled-components";

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  placeholder?: string;
  errorMessage?: string;
}

const Input = ({
  value,
  onChange,
  type = "text",
  placeholder = "",
  errorMessage,
}: InputProps) => {
  return (
    <InputContainer>
      <InputWrapper
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        error={!!errorMessage}
      />
      <ErrorMessage error={!!errorMessage}>{errorMessage}</ErrorMessage>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  flex-grow: 1;
  flex-direction: column;
`;

const InputWrapper = styled.input<{ error: boolean }>`
  ${(props) => props.theme.fonts.body14Medium}
  all: unset;
  height: 2.5rem;
  flex-grow: 1 !important;
  padding: 0 1rem;
  color: ${(props) => props.theme.colors.white};
  box-sizing: border-box;

  /* type=number 처리 */
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
  ::placeholder {
    color: ${(props) => props.theme.colors.gray6};
  }
  :focus {
    border-bottom: 1px solid ${(prop) => prop.theme.colors.white};
  }
  border-bottom: 1px solid
    ${({ theme, error }) =>
      error ? theme.colors.messageError : theme.colors.gray7};
`;

const ErrorMessage = styled.span<{ error: boolean }>`
  ${(prop) => prop.theme.fonts.body14}
  color: ${(props) => props.theme.colors.messageError};
  display: ${(props) => (props.error ? "block" : "none")};
`;

export default Input;

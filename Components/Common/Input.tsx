import { ChangeEvent } from "react";
import styled from "styled-components";

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  placeholder?: string;
}

const Input = ({
  value,
  onChange,
  type = "text",
  placeholder = "",
}: InputProps) => {
  return (
    <InputContainer
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
  );
};

const InputContainer = styled.input`
  ${(props) => props.theme.fonts.body14Medium}
  all: unset;
  height: 2.5rem;
  flex-grow: 1;
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
  border-bottom: 1px solid ${(prop) => prop.theme.colors.gray7};
`;

export default Input;

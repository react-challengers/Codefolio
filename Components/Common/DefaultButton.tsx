//todo! line57 : as any를 지우고 overload 문제 해결해야 합니다.

import styled from "styled-components";

type DefaultButtonType = "full" | "outline";
type DefaultButtonSize = "s" | "m";

interface DefaultButtonProps {
  text: string;
  type: DefaultButtonType;
  size: DefaultButtonSize;
}

const getDefaultButtonType = (type: DefaultButtonType) => {
  if (type === "full") {
    return `background-color: grey;
            color: white;`;
  }

  return `background-color: transparent;
         color: grey;
         border: 1px solid grey;
        `;
};

const getDefaultButtonSize = (size: DefaultButtonSize) => {
  if (size === "m") {
    return `width: 8rem; 
            height:2.5rem;`;
  }
  return `width: 5.625rem; 
          height: 2.5rem;`;
};

const DefaultButton = ({ text, type, size }: DefaultButtonProps) => {
  return (
    <DefaultButtonContainer type={type} size={size}>
      {text}
    </DefaultButtonContainer>
  );
};

interface DefaultButtonContainerProps {
  type: DefaultButtonType;
  size: DefaultButtonSize;
  children: string;
}

const DefaultButtonContainer = styled.button<DefaultButtonProps>`
  border-radius: 0.3125rem;
  border: none;
  cursor: pointer;
  ${({ type }: Pick<DefaultButtonContainerProps, "type">) =>
    getDefaultButtonType(type)};
  ${({ size }: Pick<DefaultButtonContainerProps, "size">) =>
    getDefaultButtonSize(size)};
` as any;

export default DefaultButton;

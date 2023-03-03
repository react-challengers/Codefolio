import { MouseEventHandler } from "react";
import styled from "styled-components";

type DefaultButtonType = "full" | "outline";
type DefaultButtonSize = "s" | "m";

interface DefaultButtonProps {
  text: string;
  buttonType: DefaultButtonType;
  size: DefaultButtonSize;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const DefaultButton = ({
  text,
  buttonType,
  size,
  onClick,
  disabled = false,
}: DefaultButtonProps) => {
  return (
    <DefaultButtonContainer
      buttonType={buttonType}
      size={size}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </DefaultButtonContainer>
  );
};

const DefaultButtonContainer = styled.button<{
  buttonType: DefaultButtonType;
  size: DefaultButtonSize;
  onClick: MouseEventHandler<HTMLButtonElement>;
}>`
  all: unset;
  cursor: pointer;
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  /* default & line */
  ${({ theme, buttonType }) =>
    buttonType === "full" ? theme.fonts.subtitle18Bold : theme.fonts.subtitle18}
  color: ${(props) => props.theme.colors.primary6};
  background-color: ${({ buttonType, theme }) =>
    buttonType === "full" ? theme.colors.gray8 : `none`};
  border: 1px solid
    ${({ theme, buttonType }) =>
      buttonType === "full" ? `none` : theme.colors.primary6};
  :hover {
    background-color: ${({ buttonType, theme }) =>
      buttonType === "full" ? theme.colors.gray5 : theme.colors.gray8};
  }
  :disabled {
    ${(props) => props.theme.fonts.subtitle18}
    color: ${(props) => props.theme.colors.white};
    background-color: ${({ theme, buttonType }) =>
      buttonType === "full" ? theme.colors.gray4 : theme.colors.primary2};
  }
  /* "s" | "m": */
  width: ${({ size }) => (size === "m" ? `10rem` : `5.625rem`)};
  height: 3.75rem;
`;

export default DefaultButton;

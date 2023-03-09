import { MouseEventHandler } from "react";
import styled from "styled-components";

type PrimaryButtonType = "default" | "line";
type PrimaryButtonSize = "s" | "m";

interface PrimaryButtonProps {
  text: string;
  buttonType: PrimaryButtonType;
  size: PrimaryButtonSize;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const PrimaryButton = ({
  text,
  buttonType,
  size,
  onClick,
  disabled = false,
}: PrimaryButtonProps) => {
  return (
    <PrimaryButtonContainer
      buttonType={buttonType}
      size={size}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </PrimaryButtonContainer>
  );
};

const PrimaryButtonContainer = styled.button<{
  buttonType: PrimaryButtonType;
  size: PrimaryButtonSize;
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
    buttonType === "default"
      ? theme.fonts.subtitle18Bold
      : theme.fonts.subtitle18}
  color: ${({ buttonType, theme }) =>
    buttonType === "default" ? theme.colors.gray11 : theme.colors.primary6};
  background-color: ${({ buttonType, theme }) =>
    buttonType === "default" ? theme.colors.primary4 : `none`};
  border: 1px solid
    ${({ theme, buttonType }) =>
      buttonType === "default" ? `none` : theme.colors.primary6};

  :hover {
    background-color: ${({ buttonType, theme }) =>
      buttonType === "default" ? theme.colors.primary6 : theme.colors.gray8};
  }

  :disabled {
    ${(props) => props.theme.fonts.subtitle18}
    color: ${({ buttonType, theme }) =>
      buttonType === "default" ? theme.colors.gray3 : theme.colors.gray4};
    background-color: ${({ theme, buttonType }) =>
      buttonType === "default" ? theme.colors.gray7 : theme.colors.primary2};
  }

  /* "s" | "m": */
  width: ${({ size }) => (size === "m" ? `10rem` : `5.5rem`)};
  height: ${({ size }) => (size === "m" ? "3.5rem" : "3rem")};
`;

export default PrimaryButton;

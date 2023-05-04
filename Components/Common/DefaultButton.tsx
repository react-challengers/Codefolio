import { MouseEventHandler } from "react";
import styled from "styled-components";

type DefaultButtonType = "full" | "outline";
type DefaultButtonSize = "s" | "m";

interface DefaultButtonProps {
  text: string;
  type: DefaultButtonType;
  size: DefaultButtonSize;
  color?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const DefaultButton = ({
  text,
  type,
  size,
  color = "white",
  onClick,
}: DefaultButtonProps) => {
  return (
    <DefaultButtonContainer
      type={type}
      color={color}
      sizes={size}
      onClick={onClick}
    >
      {text}
    </DefaultButtonContainer>
  );
};

interface DefaultButtonContainerProps {
  color: string;
  type: DefaultButtonType;
  size: DefaultButtonSize;
}
interface Theme {
  colors: {
    [key: string]: string;
  };
}
type HTMLButtonProps = React.HTMLProps<HTMLButtonElement>;

const DefaultButtonContainer = styled.button<DefaultButtonContainerProps>`
  border-radius: 0.3125rem;
  border: none;
  cursor: pointer;
  width: ${({ sizes }) => (sizes === "m" ? "8rem" : "5.625rem")};
  height: 2.5rem;
  background-color: ${({
    theme,
    type,
  }: {
    theme: Theme;
    type: DefaultButtonType;
  }) => (type === "full" ? theme.colors.gray8 : "transparent")};
  color: ${({ theme, color }: { theme: Theme; color: string }) =>
    theme.colors[color]};
` as React.FC<HTMLButtonProps>;

export default DefaultButton;

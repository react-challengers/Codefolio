import { MouseEventHandler } from "react";
import styled from "styled-components";

type DefaultButtonType = "full" | "outline";
type DefaultButtonSize = "s" | "m";

interface DefaultButtonProps {
  text: string;
  buttonType: DefaultButtonType;
  size: DefaultButtonSize;
  color?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
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
      size={size}
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

const DefaultButtonContainer = styled.button<any>`
  border-radius: 0.3125rem;
  border: none;
  cursor: pointer;
  width: ${({ size }) => (size === "m" ? 8 : 5.625)}rem;
  height: 2.5rem;
  background-color: ${({ theme, type }) =>
    type === "full" ? theme.colors.gray8 : "transparent"};
  color: ${({ theme, color }) => theme.colors[color]};
`;

export default DefaultButton;

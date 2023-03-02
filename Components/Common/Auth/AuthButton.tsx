import styled from "styled-components";
import { MouseEventHandler } from "react";

type AuthButtonType = "outLine" | "socialLogin";

const getTypeAuthButton = (buttonType: AuthButtonType) => {
  if (buttonType === "outLine") {
    return `
    background-color: #262626;
    color: #5BE1E9;
    border: .0625rem solid #5BE1E9;
    border-radius: 4px;
    `;
  }
  if (buttonType === "socialLogin") {
    return `
    background-color: #4C4C4C;
    color: #5BE1E9;
    border: .0625rem solid #5BE1E9;
    font-weight : 700;
    `;
  }
  return "";
};

interface AuthButtonProps {
  children: string;
  buttonType: AuthButtonType;
  onclick: MouseEventHandler<HTMLButtonElement>;
}

const AuthButton = ({ children, buttonType, onclick }: AuthButtonProps) => {
  return (
    <AuthButtonContainer buttonType={buttonType} onClick={onclick}>
      {children}
    </AuthButtonContainer>
  );
};

interface AuthButtonContainerProps {
  buttonType: AuthButtonType;
}

const AuthButtonContainer = styled.button<AuthButtonContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 27.25rem;
  height: 3.75rem;

  box-sizing: border-box;

  ${({ buttonType }: Pick<AuthButtonContainerProps, "buttonType">) =>
    getTypeAuthButton(buttonType)};

  cursor: pointer;
`;

export default AuthButton;

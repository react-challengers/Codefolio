import styled, { DefaultTheme } from "styled-components";
import { MouseEventHandler } from "react";

type AuthButtonType = "outLine" | "socialLogin";

const getTypeAuthButton = (buttonType: AuthButtonType, theme: DefaultTheme) => {
  if (buttonType === "outLine") {
    return `
    background-color: ${theme.colors.gray11};
    color: ${theme.colors.primary6};
    border: 1px solid ${theme.colors.primary6};
    :hover {
      background-color: ${theme.colors.gray8};
    }
    ${theme.fonts.subtitle18}
    `;
  }
  if (buttonType === "socialLogin") {
    return `
    ${theme.fonts.subtitle18Bold}
    background-color: ${theme.colors.gray8};
    border: none;
    color : ${theme.colors.primary6};
    :hover {
      background-color: ${theme.colors.gray7};
    }
    `;
  }
  return "";
};

interface AuthButtonProps {
  children: string | React.ReactNode;
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

  border-radius: 0.25rem;
  box-sizing: border-box;

  ${({ buttonType, theme }) => getTypeAuthButton(buttonType, theme)};

  cursor: pointer;

  @media (max-width: 768px) {
    width: 20rem;
  }
`;

export default AuthButton;

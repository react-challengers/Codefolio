import styled from "styled-components";

interface AuthLoginButtonProps {
  handleLogin: any;
  children: string;
}

const AuthLoginButton = ({ handleLogin, children }: AuthLoginButtonProps) => {
  return <LoginButton onClick={handleLogin}>{children}</LoginButton>;
};

const LoginButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0.625rem;
  padding: 0rem 1rem;
  gap: 0.125rem;

  width: 27.1875rem;
  height: 3.6875rem;

  border: 0.0625rem solid #333333;
  border-radius: 6.25rem;

  flex: none;
  order: 0;
  flex-grow: 0;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;

  display: flex;
  align-items: center;
  text-align: center;

  cursor: pointer;

  :hover {
    background-color: lightgray;
  }
`;

export default AuthLoginButton;

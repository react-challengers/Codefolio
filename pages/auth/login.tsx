import { NextPage, GetStaticProps } from "next";
import styled from "styled-components";
import LoginButton from "@/Components/Common/AuthLoginButton";
import Link from "next/link";
import { useState } from "react";
import supabase from "@/lib/supabase";

const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  }

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  return (
    <LoginPageContainer>
      <EmptyContainer></EmptyContainer>
      <LoginSpace>
        <LoginContainer>
          <LoginButton>카카오로 로그인하기</LoginButton>
          <LoginButton>네이버로 로그인하기</LoginButton>
          <LoginButton onClick={signInWithGoogle}>
            구글로 로그인하기
          </LoginButton>
          <LoginButton>Github로 로그인하기</LoginButton>
          <PerforatedLine data-content="또는" />
          <LoginForm>
            <LoginInput
              type={email}
              placeholder="이메일"
              onChange={(e) => setEmail(e.target.value)}
            ></LoginInput>
            <LoginInput
              type={"password"}
              placeholder="비밀번호"
              onChange={(e) => setPassword(e.target.value)}
            ></LoginInput>
          </LoginForm>
          <LoginButton onClick={signInWithEmail}>로그인</LoginButton>
          <FooterMassage>
            아직 회원이 아니신가요?
            <Link href={"./signup"}>회원가입</Link>
          </FooterMassage>
        </LoginContainer>
      </LoginSpace>
    </LoginPageContainer>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const LoginPageContainer = styled.div`
  display: flex;
`;

const EmptyContainer = styled.div`
  background-color: lightgray;
  width: 50%;
  height: 100vh;
`;

const LoginSpace = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  max-width: 28.125rem;
  height: 43.75rem;

  flex-grow: 1;
`;

const PerforatedLine = styled.hr`
  margin-top: 30px;

  width: 26.5rem;
  line-height: 1em;
  position: relative;
  outline: 0;
  border: 0;
  text-align: center;
  height: 1.5em;
  opacity: 0.5;
  &:before {
    content: "";
    background: linear-gradient(black, transparent);
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 0.0625rem;
  }
  &:after {
    content: attr(data-content);
    position: relative;
    display: inline-block;

    padding: 0 8px;
    line-height: 24px;
    // this is really the only tricky part, you need to specify the background color of the container element...
    color: black;
    background-color: white;
  }
`;

const LoginForm = styled.div`
  margin-top: 30px;

  width: 450px;
  height: 140px;
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  align-items: center;

  margin-bottom: 56px;
`;

const LoginInput = styled.input`
  width: 424px;
  height: 40px;

  outline: 0;
  border-width: 0 0 1px;
  border-color: black;

  font-size: 1rem;

  :focus {
    border-color: blue;
    border-width: 0 0 2px;
  }
`;

const FooterMassage = styled.div`
  width: 424px;
  height: 50px;

  margin-top: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
`;

export default Login;

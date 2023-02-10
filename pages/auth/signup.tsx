import { NextPage, GetStaticProps } from "next";
import styled from "styled-components";
import LoginButton from "@/Components/Common/AuthLoginButton";
import Link from "next/link";
import { useState } from "react";
import supabase from "@/lib/supabase";

const signup: NextPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const signupWithEmail = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          user_name: userName,
        },
      },
    });
  };

  return (
    <SignupPageContainer>
      <EmptyContainer></EmptyContainer>
      <SignupSpace>
        <SignupContainer>
          <SignupForm>
            <SignupInput
              placeholder="이름(닉네임)"
              onChange={(e) => setUserName(e.target.value)}
            ></SignupInput>
            <SignupInput
              type={email}
              placeholder="이메일"
              onChange={(e) => setEmail(e.target.value)}
            ></SignupInput>
            <SignupInput
              type={"password"}
              placeholder="비밀번호"
              onChange={(e) => setPassword(e.target.value)}
            ></SignupInput>
            <SignupInput
              type={"password"}
              placeholder="비밀번호 확인"
              onChange={(e) => setPasswordCheck(e.target.value)}
            ></SignupInput>
          </SignupForm>
          <LoginButton onClick={signupWithEmail}>회원가입</LoginButton>
          <FooterMassage>
            <CustomLink href={"./login"}>로그인하러가기</CustomLink>
          </FooterMassage>
        </SignupContainer>
      </SignupSpace>
    </SignupPageContainer>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const SignupPageContainer = styled.div`
  display: flex;
`;

const EmptyContainer = styled.div`
  background-color: lightgray;
  width: 50%;
  height: 100vh;
`;

const SignupSpace = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignupContainer = styled.div`
  max-width: 28.125rem;
  height: 450px;

  flex-grow: 1;
`;

const SignupForm = styled.div`
  margin-top: 30px;

  width: 450px;
  height: 140px;
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  align-items: center;

  margin-bottom: 56px;
`;

const SignupInput = styled.input`
  margin-top: 23px;
  width: 424px;
  height: 55px;

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
  width: 450px;
  height: 50px;

  margin-top: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
`;

const CustomLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

export default signup;

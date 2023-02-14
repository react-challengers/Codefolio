import { NextPage, GetStaticProps } from "next";
import styled from "styled-components";
import LoginButton from "@/Components/Common/AuthLoginButton";
import Link from "next/link";
import { useState } from "react";
import supabase from "@/lib/supabase";
import { useRouter } from "next/router";

/**
 * 현재 가장 기본적 유효성검사, "빈 인풋 체크"와 비밀번호 확인 부분만 추가되어 있습니다.
 * @TODO custom hooks (made by nne3enn) 을 사용해서 리팩토링
 * @TODO 유효성 검사 부분은 디자인이 나왔을 때, 해당 부분과 같이 작업 필요
 */

const signup: NextPage = () => {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const signupWithEmail = async () => {
    if (!userName || !email || !password || !passwordCheck) {
      return alert("모든 데이터를 입력해주세요.");
    }
    if (password !== passwordCheck) {
      return alert("패스워드를 확인해주세요.");
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          user_name: userName,
        },
      },
    });

    if (!error) {
      resetInputs();

      alert("회원가입 완료");
      router.push("/on-boarding");
    }
  };

  // 인풋창 초기화
  const resetInputs = () => {
    setUserName("");
    setEmail("");
    setPassword("");
    setPasswordCheck("");
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
  height: 28.125rem;

  flex-grow: 1;
`;

const SignupForm = styled.div`
  margin-top: 2rem;

  width: 28.125rem;
  height: 8.75rem;
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  align-items: center;

  margin-bottom: 3.5rem;
`;

const SignupInput = styled.input`
  margin-top: 1.5rem;
  width: 26.5rem;
  height: 3.5rem;

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
  width: 28.125rem;
  height: 3.125rem;

  margin-top: 0.625rem;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8125rem;
`;

const CustomLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

export default signup;

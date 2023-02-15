import { NextPage, GetStaticProps } from "next";
import styled from "styled-components";
import LoginButton from "@/Components/Common/AuthLoginButton";
import Link from "next/link";
import { useState } from "react";
import supabase from "@/lib/supabase";
import { useRouter } from "next/router";
// import { kakaoInit } from "@/utils/APIs/socialLogin";

/**
 * 일단 kakao 로그인의 경우 주석처리 해놨습니다.
 * @TODO 소셜 로그인 추가 구현 필요 (카카오, 네이버), supabase 서버와의 연결이 필요
 * @TODO 로그인 실패시, 처리 구현
 */

const Login: NextPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const kakaoLogin = async () => {
  //   // 카카오 초기화
  //   const kakao = kakaoInit();

  //   // 카카오 로그인 구현
  //   kakao.Auth.login({
  //     success: () => {
  //       kakao.API.request({
  //         url: "/v2/user/me", // 사용자 정보 가져오기
  //         success: (res: any) => {
  //           // 로그인 성공할 경우 정보 확인 후 /kakao 페이지로 push
  //           console.log(res);
  //           router.push("/on-boarding");
  //         },
  //         fail: (error: any) => {
  //           console.log(error);
  //         },
  //       });
  //     },
  //     fail: (error: any) => {
  //       console.log(error);
  //     },
  //   });
  // };

  const signInWithEmail = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error) {
      setEmail("");
      setPassword("");
      alert("이메일 로그인 완료");
      router.push("/on-boarding");
    }
  };

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (!error) {
      alert("구글 로그인 완료");
      router.push("/on-boarding");
    }
  };

  const signInWithGitHub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (!error) {
      alert("깃헙 로그인 완료");
      router.push("/on-boarding");
    }
  };

  return (
    <LoginPageContainer>
      <EmptyContainer></EmptyContainer>
      <LoginSpace>
        <LoginContainer>
          {/* <LoginButton>카카오로 로그인하기</LoginButton>
          <LoginButton>네이버로 로그인하기</LoginButton> */}
          <LoginButton onClick={signInWithGoogle}>
            구글로 로그인하기
          </LoginButton>
          <LoginButton onClick={signInWithGitHub}>
            Github로 로그인하기
          </LoginButton>
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
  margin-top: 1.875rem;

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
    background: linear-gradient;
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 0.625rem;
  }
  &:after {
    content: attr(data-content);
    position: relative;
    display: inline-block;

    padding: 0 0.5rem;
    line-height: 1.5rem;
    color: black;
    background-color: white;
  }
`;

const LoginForm = styled.div`
  margin-top: 1.875rem;

  width: 28.125rem;
  height: 8.75rem;
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  align-items: center;

  margin-bottom: 3.5rem;
`;

const LoginInput = styled.input`
  width: 26.5rem;
  height: 2.5rem;

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
  width: 26.5rem;
  height: 3.125rem;

  margin-top: 0.625rem;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8125rem;
`;

export default Login;

import { NextPage, GetStaticProps } from "next";
import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";
import { useRouter } from "next/router";
import { email_check, password_check } from "@/utils/commons/authValidate";
import { ValidateText, AuthButton, AuthInput } from "@/Components/Common/Auth";

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
  const [emailValidate, setEmailValidate] = useState(true);
  const [passwordValidate, setPasswordValidate] = useState(true);

  useEffect(() => {
    // 로그인 상태 확인
    const LoginState = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session !== null) {
        router.push("/");
      }
    };

    LoginState();
  }, []);

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
  //           router.push("/");
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
    if (email === "" || password === "") {
      return alert("이메일과 패스워드 모두 입력해주세요.");
    }

    if (!email_check(email)) {
      setEmailValidate(false);
      return alert("이메일의 형식을 확인해주세요.");
    } else setEmailValidate(true);

    if (!password_check(password)) {
      setPasswordValidate(false);
      return alert("비밀번호는 8자리 이상 입니다. ");
    } else setPasswordValidate(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error) {
      setEmail("");
      setPassword("");
      router.push("/");
    } else {
      alert("로그인 실패");
    }
  };

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (!error) {
      router.push("/");
    } else {
      alert("구글 로그인 실패");
    }
  };

  const signInWithGitHub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (!error) {
      router.push("/");
    } else {
      alert("깃헙 로그인 실패");
    }
  };

  return (
    <LoginPageContainer>
      <EmptyContainer></EmptyContainer>
      <LoginSpace>
        <LoginContainer>
          {/* <LoginButton>카카오로 로그인하기</LoginButton>
          <LoginButton>네이버로 로그인하기</LoginButton> */}
          <AuthButton onClick={signInWithGoogle}>구글로 로그인하기</AuthButton>
          <AuthButton onClick={signInWithGitHub}>
            Github로 로그인하기
          </AuthButton>
          <HrContainer>
            <span> 또는 </span>
          </HrContainer>
          <LoginForm>
            <AuthInput
              type={email}
              placeholder="이메일"
              onChange={(e) => setEmail(e.target.value)}
            ></AuthInput>
            {emailValidate ? (
              <ValidateText />
            ) : (
              <ValidateText> 이메일을 확인해주세요. </ValidateText>
            )}
            <AuthInput
              type={"password"}
              placeholder="비밀번호"
              onChange={(e) => setPassword(e.target.value)}
            ></AuthInput>
            {passwordValidate ? (
              <ValidateText />
            ) : (
              <ValidateText> 비밀번호를 확인해보세요. </ValidateText>
            )}
          </LoginForm>
          <AuthButton onClick={signInWithEmail}>로그인</AuthButton>
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

  justify-content: center;
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
  height: 43.75rem;

  flex-grow: 1;
`;

const HrContainer = styled.div`
  width: 26.875rem;
  text-align: center;
  border-bottom: 1px solid #a0a0a0;
  line-height: 0.1em;
  margin: 1.875rem 0.625rem 1.25rem;

  span {
    background: #fff;
    padding: 0 0.625rem;
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

const FooterMassage = styled.div`
  width: 26.5rem;
  height: 3.125rem;

  margin-top: 0.625rem;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8125rem;

  gap: 0.5rem;
`;

export default Login;

import { NextPage, GetStaticProps } from "next";
import styled from "styled-components";
import Link from "next/link";
import supabase from "@/lib/supabase";

import { useState } from "react";
import { useRouter } from "next/router";
import { AuthInput, AuthButton, HelperTextBox } from "@/Components/Common/Auth";
import {
  checkEmail,
  checkPassword,
  checkUserName,
  checkSamePassword,
} from "@/utils/commons/authUtils";
import { useSetRecoilState } from "recoil";
import { userLoginCheck } from "@/lib/recoil";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/utils/APIs/supabase";

/**
 * @TODO custom hooks 을 사용해서 리팩토링
 */

const SignUpPage: NextPage = () => {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [userNameHelperText, setUserNameHelperText] = useState("");
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [passwordCheckHelperText, setPasswordCheckHelperText] = useState("");

  const setIsLogin = useSetRecoilState(userLoginCheck);

  useQuery(["currentUser"], {
    queryFn: getCurrentUser,
    onSuccess({ data: { user } }) {
      if (user) {
        router.push("/");
      }
    },
  });

  const validateCheck = async () => {
    setUserNameHelperText(checkUserName(userName));
    setEmailHelperText(checkEmail(email));
    setPasswordHelperText(checkPassword(password));
    setPasswordCheckHelperText(checkSamePassword(password, passwordCheck));
  };

  const signupWithEmail = async () => {
    validateCheck();

    // 유효성 검사 결과 fail일 경우, supabase에 요청 안함
    if (
      checkUserName(userName) ||
      checkEmail(email) ||
      checkPassword(password) ||
      checkSamePassword(password, passwordCheck)
    ) {
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: userName,
          email,
        },
      },
    });

    if (!error) {
      setIsLogin(true);
      router.push("/");
    }
  };
  return (
    <SignupPageContainer>
      <EmptyContainer />
      <SignupSpace>
        <SignupForm>
          <AuthInput
            value={userName}
            placeholder="이름(닉네임)"
            onChange={(e) => setUserName(e.target.value)}
            validate={userNameHelperText}
          />
          <HelperTextBox text={userNameHelperText} />

          <AuthInput
            type={email}
            value={email}
            placeholder="이메일"
            onChange={(e) => setEmail(e.target.value)}
            validate={emailHelperText}
          />
          <HelperTextBox text={emailHelperText} />

          <AuthInput
            type="password"
            value={password}
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
            validate={passwordHelperText}
          />
          <HelperTextBox text={passwordHelperText} />

          <AuthInput
            type="password"
            value={passwordCheck}
            placeholder="비밀번호 확인"
            onChange={(e) => setPasswordCheck(e.target.value)}
            validate={passwordCheckHelperText}
          />
          <HelperTextBox text={passwordCheckHelperText} />
        </SignupForm>
        <AuthButton buttonType="outLine" onclick={signupWithEmail}>
          회원가입
        </AuthButton>
        <FooterMassage>
          <CustomLink href="./login">로그인하러</CustomLink>
        </FooterMassage>
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
  width: 50%;
  height: 100vh;

  background-image: url("/images/signup_background.png");
  background-size: cover;
  background-position: center;
`;

const SignupSpace = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`;

const SignupForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterMassage = styled.div`
  margin-top: 12px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const CustomLink = styled(Link)`
  width: 3.75rem;
  height: 1.125rem;
  ${({ theme }) => theme.fonts.body13};

  color: ${({ theme }) => theme.colors.gray6};
`;

export default SignUpPage;

import { NextPage, GetStaticProps } from "next";
import styled from "styled-components";
import Link from "next/link";
import supabase from "@/lib/supabase";
import Image from "next/image";

import { useState } from "react";
import { useRouter } from "next/router";
import {
  AuthInput,
  AuthButton,
  HelperTextBox,
  ErrorMessageBox,
} from "@/Components/Common/Auth";
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

import ico_close_16 from "@/public/icons/ico_close_16.svg";
import ico_ExclamationMark from "@/public/icons/ico_ExclamationMark.svg";

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

  const [isError, setIsError] = useState(false);

  const setIsLogin = useSetRecoilState(userLoginCheck);

  useQuery(["currentUser"], {
    queryFn: getCurrentUser,
    onSuccess({ data: { user } }) {
      if (user) {
        router.push("/");
      }
    },
  });

  const validateCheck = () => {
    setUserNameHelperText(checkUserName(userName));
    setEmailHelperText(checkEmail(email));
    setPasswordHelperText(checkPassword(password));
    setPasswordCheckHelperText(checkSamePassword(password, passwordCheck));
  };

  const signupWithEmail = async () => {
    validateCheck();
    setIsError(false);

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
    if (error?.stack?.includes("User already registered")) {
      setIsError(true);
    }

    if (!error) {
      setIsLogin(true);
      router.push("/");
    }
  };

  const resetInput = (key: string) => {
    switch (key) {
      case "userName":
        setUserName("");
        setUserNameHelperText("");
        break;
      case "email":
        setEmail("");
        setEmailHelperText("");
        break;
      case "password":
        setPassword("");
        setPasswordHelperText("");
        break;
      case "passwordCheck":
        setPasswordCheck("");
        setPasswordCheckHelperText("");
        break;

      default:
        break;
    }
  };

  return (
    <SignupPageContainer>
      <EmptyContainer />
      <SignupSpace>
        <SignupForm>
          <div>
            {isError ? (
              <ErrorMessageBox Error>
                <SocialIcon
                  src={ico_ExclamationMark}
                  alt="에러 느낌표"
                  width={20}
                  height={20}
                />
                이미 등록된 아이디 입니다.
              </ErrorMessageBox>
            ) : (
              <ErrorMessageBox Error={false} />
            )}
            {userNameHelperText && (
              <CloseSvg
                src={ico_close_16}
                alt="user name reset button"
                width={25}
                height={25}
                onClick={() => resetInput("userName")}
              />
            )}
            <AuthInput
              value={userName}
              placeholder="이름(닉네임)"
              onChange={(e) => setUserName(e.target.value)}
              validate={userNameHelperText}
            />
          </div>
          <div>
            <HelperTextBox text={userNameHelperText} />
            {emailHelperText && (
              <CloseSvg
                src={ico_close_16}
                alt="email reset button"
                width={25}
                height={25}
                onClick={() => resetInput("email")}
              />
            )}
            <AuthInput
              type={email}
              value={email}
              placeholder="이메일"
              onChange={(e) => setEmail(e.target.value)}
              validate={emailHelperText}
            />
          </div>
          <div>
            <HelperTextBox text={emailHelperText} />
            {passwordHelperText && (
              <CloseSvg
                src={ico_close_16}
                alt="password reset button"
                width={25}
                height={25}
                onClick={() => resetInput("password")}
              />
            )}
            <AuthInput
              type="password"
              value={password}
              placeholder="비밀번호"
              onChange={(e) => setPassword(e.target.value)}
              validate={passwordHelperText}
            />
          </div>

          <div>
            <HelperTextBox text={passwordHelperText} />
            {passwordCheckHelperText && (
              <CloseSvg
                src={ico_close_16}
                alt="paspasswordChecksword reset button"
                width={25}
                height={25}
                onClick={() => resetInput("passwordCheck")}
              />
            )}
            <AuthInput
              type="password"
              value={passwordCheck}
              placeholder="비밀번호 확인"
              onChange={(e) => setPasswordCheck(e.target.value)}
              validate={passwordCheckHelperText}
            />
          </div>

          <HelperTextBox text={passwordCheckHelperText} />
        </SignupForm>
        <AuthButton buttonType="outLine" onclick={signupWithEmail}>
          회원가입
        </AuthButton>
        <FooterMessage>
          <CustomLink href="./login">로그인하기</CustomLink>
        </FooterMessage>
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

const SocialIcon = styled(Image)`
  margin-right: 0.5rem;
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

const CloseSvg = styled(Image)`
  position: absolute;
  float: left;

  color: ${({ theme }) => theme.colors.gray4};

  cursor: pointer;

  margin-left: 25rem;
`;

const FooterMessage = styled.div`
  margin-top: 0.75rem;

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

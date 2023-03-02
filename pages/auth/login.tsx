import { NextPage, GetStaticProps } from "next";
import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";
import supabase from "@/lib/supabase";
import { useRouter } from "next/router";
import { checkEmail, checkPassword } from "@/utils/commons/authUtils";
import { HelperTextBox, AuthInput, AuthButton } from "@/Components/Common/Auth";
import { useSetRecoilState } from "recoil";
import { userLoginCheck } from "@/lib/recoil";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/utils/APIs/supabase";
import ico_github from "@/public/icons/ico_github.svg";
import ico_google from "@/public/icons/ico_google.svg";
import ico_ExclamationMark from "@/public/icons/ico_ExclamationMark.svg";
import ico_close_16 from "@/public/icons/ico_close_16.svg";

import Image from "next/dist/client/image";

const Login: NextPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");

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
    setEmailHelperText(checkEmail(email));
    setPasswordHelperText(checkPassword(password));
  };

  const signInWithEmail = async () => {
    validateCheck();

    // 유효성 검사 결과 fail일 경우, supabase에 요청 안함
    if (checkEmail(email) || checkPassword(password)) {
      setIsError(true);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error) {
      setIsLogin(true);
      router.push("/");
    }
    setIsError(true);
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (!error) {
      setIsLogin(true);
      router.push("/");
    }
  };

  const signInWithGitHub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (!error) {
      setIsLogin(true);
      router.push("/");
    }
  };

  const resetInput = (key: string) => {
    switch (key) {
      case "email":
        setEmail("");
        setEmailHelperText("");
        break;
      case "password":
        setPassword("");
        setPasswordHelperText("");
        break;

      default:
        break;
    }
  };

  return (
    <LoginPageContainer>
      <EmptyContainer />
      <LoginSpace>
        {isError ? (
          <ErrorMassageBox background="#E22C35">
            <SocialIcon
              src={ico_ExclamationMark}
              alt="ico_ExclamationMark"
              width={25}
              height={24}
            />
            등록 안 된 이메일이거나 비밀번호를 잘못 입력했습니다.
          </ErrorMassageBox>
        ) : (
          <ErrorMassageBox background={null} />
        )}
        <SocialLoginButtonContainer>
          <AuthButton buttonType="socialLogin" onclick={signInWithGoogle}>
            <SocialIcon
              src={ico_github}
              alt="ico_github"
              width={25}
              height={24}
            />
            구글로 로그인하기
          </AuthButton>
          <AuthButton buttonType="socialLogin" onclick={signInWithGitHub}>
            <SocialIcon
              src={ico_google}
              alt="ico_github"
              width={25}
              height={24}
            />
            Github로 로그인하기
          </AuthButton>
        </SocialLoginButtonContainer>
        <HrContainer>
          <hr />
          <span> 또는 </span>
          <hr />
        </HrContainer>
        <LoginForm>
          <div>
            {emailHelperText && (
              <CloseSvg
                src={ico_close_16}
                alt="ico_close_16"
                width={25}
                height={24}
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

            <HelperTextBox text={emailHelperText} />
          </div>
          <div>
            {passwordHelperText && (
              <CloseSvg
                src={ico_close_16}
                alt="ico_close_16"
                width={25}
                height={24}
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
          <HelperTextBox text={passwordHelperText} />
        </LoginForm>
        <AuthButton buttonType="outLine" onclick={signInWithEmail}>
          로그인
        </AuthButton>
        <FooterMassage>
          아직 회원이 아니신가요?
          <CustomLink href="./signup">회원가입</CustomLink>
        </FooterMassage>
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
  width: 100vw;
`;

const EmptyContainer = styled.div`
  width: 50%;
  height: 100vh;

  border: none;

  background-image: url("/images/login_background.png");
  background-size: cover;
  background-position: center;
`;

const LoginSpace = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`;

const HrContainer = styled.div`
  display: flex;

  margin-top: 1.5rem;

  hr {
    width: 11.25rem;
    border: none;

    border-top: 1px solid ${({ theme }) => theme.colors.gray6};
  }

  span {
    ${({ theme }) => theme.fonts.body14}

    background: ${({ theme }) => theme.colors.gray11};
    padding: 0 1.5rem;
    color: ${({ theme }) => theme.colors.gray6};
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

  margin-bottom: 1.5rem;
`;

const CloseSvg = styled(Image)`
  position: absolute;
  float: left;

  color: ${({ theme }) => theme.colors.gray4};

  cursor: pointer;

  margin-left: 25rem;
`;

interface ErrorMassageBoxProps {
  background: string | null;
}

const ErrorMassageBox = styled.div<ErrorMassageBoxProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.fonts.subtitle16}
  color: ${({ theme }) => theme.colors.white};
  background: ${(props) => props.background};

  width: 27.25rem;
  height: 3.5rem;

  background: ${(props) =>
    props.background ? "red" : props.theme.colors.gray11};

  margin-bottom: 1.75rem;
  border-radius: 0.5rem;
`;

const SocialLoginButtonContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.5rem;
`;

const SocialIcon = styled(Image)`
  margin-right: 0.5rem;
`;

const FooterMassage = styled.div`
  ${({ theme }) => theme.fonts.body13};

  margin-top: 0.75rem;
  color: ${({ theme }) => theme.colors.gray6};
`;

const CustomLink = styled(Link)`
  width: 3rem;
  height: 1.125rem;

  margin-left: 0.875rem;
  ${({ theme }) => theme.fonts.body13};

  color: ${({ theme }) => theme.colors.gray6};
`;

export default Login;

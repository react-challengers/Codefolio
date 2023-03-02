import { NextPage, GetStaticProps } from "next";
import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";
import { useRouter } from "next/router";
import { checkEmail, checkPassword } from "@/utils/commons/authUtils";
import { ValidateText, AuthInput } from "@/Components/Common/Auth";
import { useSetRecoilState } from "recoil";
import { userLoginCheck } from "@/lib/recoil";
import { LongButton, Modal } from "@/Components/Common";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/utils/APIs/supabase";

const Login: NextPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidate, setEmailValidate] = useState(true);
  const [passwordValidate, setPasswordValidate] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState<string | null>("");
  const [modalContent, setModalContent] = useState<string | null>("");

  const setIsLogin = useSetRecoilState(userLoginCheck);

  useQuery(["currentUser"], {
    queryFn: getCurrentUser,
    onSuccess({ data: { user } }) {
      if (user) {
        router.push("/");
      }
    },
  });

  const signInWithEmail = async () => {
    if (email === "" || password === "") {
      return OpenModal("이메일과 비밀번호 모두 입력해주세요.", null);
    }

    if (!checkEmail(email)) {
      setEmailValidate(false);
      return OpenModal("이메일의 형식을 확인해주세요.", null);
    }
    setEmailValidate(true);

    if (!checkPassword(password)) {
      setPasswordValidate(false);
      return OpenModal("비밀번호는 8자리 이상 입니다.", null);
    }
    setPasswordValidate(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error) {
      setIsLogin(true);
      return router.push("/");
    }
    return OpenModal("로그인 실패", null);
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (!error) {
      setIsLogin(true);
      return router.push("/");
    }
    return OpenModal("구글 로그인 실패", null);
  };

  const signInWithGitHub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (!error) {
      setIsLogin(true);
      router.push("/");
    } else {
      OpenModal("github 로그인 실패", null);
    }
  };

  const OpenModal = (title: string | null, content: string | null) => {
    setModalTitle(title);
    setModalContent(content);
    setShowModal(true);
  };

  return (
    <LoginPageContainer>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} title={modalTitle}>
          {modalContent}
        </Modal>
      )}
      <EmptyContainer />
      <LoginSpace>
        <LongButton onClick={signInWithGoogle}>구글로 로그인하기</LongButton>
        <LongButton onClick={signInWithGitHub}>Github로 로그인하기</LongButton>
        <HrContainer>
          <span> 또는 </span>
        </HrContainer>
        <LoginForm>
          <AuthInput
            type={email}
            placeholder="이메일"
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailValidate ? (
            <ValidateText />
          ) : (
            <ValidateText> 이메일을 확인해주세요. </ValidateText>
          )}
          <AuthInput
            type="password"
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordValidate ? (
            <ValidateText />
          ) : (
            <ValidateText> 비밀번호를 확인해보세요. </ValidateText>
          )}
        </LoginForm>
        <LongButton onClick={signInWithEmail}>로그인</LongButton>
        <FooterMassage>
          아직 회원이 아니신가요?
          <Link href="./signup">회원가입</Link>
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

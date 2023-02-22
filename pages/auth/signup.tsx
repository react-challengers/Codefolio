import { NextPage, GetStaticProps } from "next";
import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";
import { useRouter } from "next/router";
import { AuthInput, ValidateText } from "@/Components/Common/Auth";
import { LongButton, Modal } from "@/Components/Common";
import {
  checkEmail,
  checkPassword,
  checkUserName,
} from "@/utils/commons/authUtils";
import { useSetRecoilState } from "recoil";
import { userLoginCheck } from "@/lib/recoil";

/**
 * 현재 가장 기본적 유효성검사, "빈 인풋 체크"와 비밀번호 확인 부분만 추가되어 있습니다.
 * @TODO custom hooks (made by nne3enn) 을 사용해서 리팩토링
 */

const SignUpPage: NextPage = () => {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [userNameValidate, setUserNameValidate] = useState(true);
  const [emailValidate, setEmailValidate] = useState(true);
  const [passwordValidate, setPasswordValidate] = useState(true);
  const [passwordCheckValidate, setPasswordCheckValidate] = useState(true);

  const setIsLogin = useSetRecoilState(userLoginCheck);

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState<string | null>("");
  const [modalContent, setModalContent] = useState<string | null>("");

  useEffect(() => {
    // 로그인 상태 확인
    const LoginState = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session !== null) {
        router.push("/");
      }
    };
    LoginState();
  }, [router]);

  const signupWithEmail = async () => {
    if (!userName || !email || !password || !passwordCheck) {
      return OpenModal("모든 데이터를 입력해주세요.", null);
    }

    if (!checkUserName(userName)) {
      setUserNameValidate(false);
      return OpenModal("이름(닉네임)은 2글자 이상입니다.", null);
    }
    setUserNameValidate(true);

    if (!checkEmail(email)) {
      setEmailValidate(false);
      return OpenModal("이메일의 형식을 확인해주세요.", null);
    }
    setEmailValidate(true);

    if (!checkPassword(password)) {
      setPasswordValidate(false);
      return OpenModal("비밀번호는 8자리 이상 입니다. ", null);
    }
    setPasswordValidate(true);

    if (!(password === passwordCheck)) {
      setPasswordCheckValidate(false);
      return OpenModal("비밀번호가 일치하지 않습니다.", null);
    }
    setPasswordCheckValidate(true);

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
      OpenModal("회원가입 완료", null);
      return router.push("/");
    }
    return OpenModal("회원가입 실패", null);
  };

  const OpenModal = (title: string | null, content: string | null) => {
    setModalTitle(title);
    setModalContent(content);
    setShowModal(true);
  };

  return (
    <SignupPageContainer>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} title={modalTitle}>
          {modalContent}
        </Modal>
      )}
      <EmptyContainer />
      <SignupSpace>
        <SignupForm>
          <AuthInput
            value={userName}
            placeholder="이름(닉네임) 2글자 이상"
            onChange={(e) => setUserName(e.target.value)}
          />
          {userNameValidate ? (
            <ValidateText />
          ) : (
            <ValidateText> 닉네임을 확인해주세요. </ValidateText>
          )}
          <AuthInput
            type={email}
            value={email}
            placeholder="이메일"
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailValidate ? (
            <ValidateText />
          ) : (
            <ValidateText> 이메일을 형식을 확인해주세요. </ValidateText>
          )}
          <AuthInput
            type="password"
            value={password}
            placeholder="비밀번호 8글자 이상"
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordValidate ? (
            <ValidateText />
          ) : (
            <ValidateText> 비밀번호 8자리 이상 입니다. </ValidateText>
          )}
          <AuthInput
            type="password"
            value={passwordCheck}
            placeholder="비밀번호 확인"
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
          {passwordCheckValidate ? (
            <ValidateText />
          ) : (
            <ValidateText> 비밀번호가 일치하지 않습니다. </ValidateText>
          )}
          <SignupButton onClick={signupWithEmail}>회원가입</SignupButton>
          <FooterMassage>
            <CustomLink href="./login">로그인하러가기</CustomLink>
          </FooterMassage>
        </SignupForm>
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

const SignupForm = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  align-items: center;

  margin-bottom: 3.5rem;
`;

const SignupButton = styled(LongButton)`
  margin-top: 2rem;
`;

const FooterMassage = styled.div`
  margin-top: 0.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8125rem;
`;

const CustomLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

export default SignUpPage;

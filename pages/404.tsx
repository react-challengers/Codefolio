import LoginButton from "@/Components/Common/AuthLoginButton";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";

/**
 * LoginButton의 모양만 재사용합니다. 로그인 로직과 무관합니다.
 */

const NotFoundPage: NextPage = () => {
  const router = useRouter();
  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <PageNotFoundContainer>
      <Ellipse />
      <Title>죄송합니다. 원하시는 페이지를 찾을 수 없습니다.</Title>
      <Paragraph>
        {
          "찾으려는 페이지의 주소가 잘못 입력되었거나 \n 주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다. \n 입력하신 페이지의 주소가 정확한지 다시 한 번 확인해주세요."
        }
      </Paragraph>
      <LoginButton onClick={handleBackToHome}>홈으로 가기</LoginButton>
    </PageNotFoundContainer>
  );
};

const PageNotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Ellipse = styled.div`
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 50%;
  background: #d9d9d9;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 2.5rem;
  line-height: 3.75rem;
  text-align: center;
  margin: 3rem 0;
`;

const Paragraph = styled.p`
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 2rem;
  text-align: center;
  width: 39.75rem;
  margin: 0 0 3rem;
  word-break: keep-all;
  white-space: pre-line;
`;

export default NotFoundPage;

import { NextPage } from "next";
import styled from "styled-components";
import { useRouter } from "next/router";
import LoginButton from "@/Components/Common/AuthLoginButton";

/**
 * @see http://localhost:3000/500
 * yarn build -> yarn start 배포 환경에서 확인하기 바랍니다.
 */

const ServerSideErrorPage: NextPage = () => {
  const router = useRouter();
  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <PageNotFoundContainer>
      <Ellipse />
      <Title>죄송합니다. 서비스에 접속할 수 없습니다.</Title>
      <Paragraph>
        {
          "기술적인 문제로 일시적으로 접속되지 않습니다. \n 잠시후 다시 이용 부탁드립니다. "
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

export default ServerSideErrorPage;

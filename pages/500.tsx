import { NextPage } from "next";
import styled from "styled-components";
import { useRouter } from "next/router";
import { LongButton } from "@/Components/Common";
import Image from "next/image";
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
      <Image
        src="/images/error_boy.png"
        alt="에러 보이"
        width={120}
        height={120}
      />
      <div>
        <Title>죄송합니다...</Title>
        <Title>서비스에 접속할 수 없습니다.</Title>
      </div>
      <Paragraph>
        {
          "기술적인 문제로 일시적으로 접속되지 않습니다. \n 잠시후 다시 이용 부탁드립니다. "
        }
      </Paragraph>
      <LongButton onClick={handleBackToHome}>홈으로 가기</LongButton>
    </PageNotFoundContainer>
  );
};

const PageNotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3.875rem;
  width: fit-content;
  height: fit-content;
  margin: 14.375rem auto;
`;

const Title = styled.h2`
  ${({ theme }) => theme.fonts.title36};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;

const Paragraph = styled.p`
  ${({ theme }) => theme.fonts.subtitle18};
  color: ${({ theme }) => theme.colors.gray2};
  text-align: center;
  word-break: keep-all;
  white-space: pre-line;
`;

export default ServerSideErrorPage;

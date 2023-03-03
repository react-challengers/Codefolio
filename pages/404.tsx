import { LongButton } from "@/Components/Common";
import { NextPage } from "next";
import Image from "next/image";
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
      <Image
        src="/images/error_boy.png"
        alt="에러 보이"
        width={120}
        height={120}
      />
      <div>
        <Title>죄송합니다...</Title>
        <Title>원하시는 페이지를 찾을 수 없습니다.</Title>
      </div>
      <Paragraph>
        {
          "찾으려는 페이지의 주소가 잘못 입력되었거나 \n 주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다. \n 입력하신 페이지의 주소가 정확한지 다시 한 번 확인해주세요."
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

export default NotFoundPage;

import { LongButton } from "@/Components/Common";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

const MobilePreparing: NextPage = () => {
  const router = useRouter();

  const handleClickHome = () => {
    router.push("/");
  };

  return (
    <MobilePreparingContainer>
      <Image
        src="/images/error_boy.png"
        alt="에러 보이"
        width={120}
        height={120}
      />
      <div>
        <Title>죄송합니다...</Title>
        <Title>모바일 서비스를 준비중 입니다.</Title>
      </div>
      <Paragraph>
        {"에디터의 호환 문제로 모바일 환경에서 \n 글 작성하기가 어렵습니다. "}
      </Paragraph>
      <LongButton onClick={handleClickHome}>홈으로 가기</LongButton>
    </MobilePreparingContainer>
  );
};

const MobilePreparingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: fit-content;
  height: fit-content;
  margin: 3rem auto;
`;

const Title = styled.h2`
  ${({ theme }) => theme.fonts.title24};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;

const Paragraph = styled.p`
  ${({ theme }) => theme.fonts.subtitle16};
  color: ${({ theme }) => theme.colors.gray2};
  text-align: center;
  word-break: keep-all;
  white-space: pre-line;
`;

export default MobilePreparing;

import Link from "next/link";
import styled from "styled-components";

const Banner = () => {
  return (
    <BannerContainer>
      <BannerContent>
        <BannerTitle>부트캠프에서 프로젝트 정리와 취업을 한꺼번에</BannerTitle>
        <BannerParagraph>열심히 만든 프로젝트가 아깝지 않게</BannerParagraph>
        <BannerParagraph>
          수강생 여러분들의 노력을 최고의 결과물로 만들어보세요
        </BannerParagraph>
        <Link href="/on-boarding">
          <BannerButton>Codefolio 소개 보기</BannerButton>
        </Link>
      </BannerContent>
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  width: 100%;
  height: 18.5rem;

  background-image: url("/images/main-banner.webp");
  background-size: cover;
`;

const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin: 3.2188rem 0 3.2188rem 17.1875rem;
`;

const BannerTitle = styled.h1`
  ${({ theme }) => theme.fonts.title36};
  color: ${({ theme }) => theme.colors.white};

  margin-bottom: 0.75rem;
`;

const BannerParagraph = styled.p`
  ${({ theme }) => theme.fonts.body16};
  color: ${({ theme }) => theme.colors.white};
`;

const BannerButton = styled.button`
  width: 13.8125rem;
  height: 3.4375rem;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.primary6};
  color: ${({ theme }) => theme.colors.primary6};
  border-radius: 0.25rem;
  margin-top: 1.5rem;
  cursor: pointer;

  ${({ theme }) => theme.fonts.subtitle18};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray8};
  }
`;

export default Banner;

import { NextPage, GetStaticProps } from "next";
import Image from "next/image";
import styled from "styled-components";

const OnBoardingPage: NextPage = () => {
  return (
    <OnBoardingContainer>
      <OnBoardingTitleContainer>
        <OnBoardingTitle>Codefolio 서비스 소개</OnBoardingTitle>
        <OnBoardingSubTitle>
          코드폴리오는 부트캠프 수강생들이 작업한 프로젝트를 체계적으로 정리하여
          채용과 연계할 수 있는 포트폴리오 공유 서비스입니다.
        </OnBoardingSubTitle>
      </OnBoardingTitleContainer>
      <OnBoardingCardContainer>
        <OnBoardingCardTitle>1. 프로젝트 글 작성 및 공유</OnBoardingCardTitle>
        <OnBoardingCardParagraph>
          카테고리, 개발 스택 등 프로젝트의 <Point>상세 정보를 입력</Point>하고
          개발자들에게 친숙한 <Point>에디터 기능</Point>을 통해 프로젝트 글을
          간편하게 작성할 수 있어요.
        </OnBoardingCardParagraph>
        <OnBoardingCardImage
          src="/images/on-boarding-01.png"
          alt="on-boarding-01"
          width="725"
          height="850"
        />
        <OnBoardingCardParagraph>
          프로젝트 글을 게시하면 모든 사용자들이 여러분의 프로젝트 글을 볼 수
          있어요. 프로젝트 상세 페이지에서 작성한 내용을 확인해보세요.
        </OnBoardingCardParagraph>
        <OnBoardingCardImage
          src="/images/on-boarding-02.png"
          alt="on-boarding-02"
          width="725"
          height="600"
        />
      </OnBoardingCardContainer>
      <OnBoardingCardContainer>
        <OnBoardingCardTitle>2. 피드백 주고받기</OnBoardingCardTitle>
        <OnBoardingCardParagraph>
          다른 수강생들의 다양한 프로젝트들을 감상해보세요. 아이디어가 좋거나
          코드가 훌륭한 프로젝트들이 있다면 <Point>칭찬배지</Point>로
          칭찬해주세요! 서로에게 힘이 되어주는 응원 댓글도 좋아요.
        </OnBoardingCardParagraph>
        <OnBoardingCardImage
          src="/images/on-boarding-03.png"
          alt="on-boarding-03"
          width="725"
          height="600"
        />
        <OnBoardingCardParagraph>
          프로젝트 뿐만 아니라 다른 수강생들에게 직접 칭찬배지를 줄 수도 있어요.
          팀워크가 좋았거나 코드 구현이 좋았던 수강생에게 칭찬배지를 건네주세요.
        </OnBoardingCardParagraph>
        <OnBoardingCardImage
          src="/images/on-boarding-04.png"
          alt="on-boarding-04"
          width="725"
          height="500"
        />
      </OnBoardingCardContainer>
      <OnBoardingCardContainer>
        <OnBoardingCardTitle>
          3. 채용 프로세스 (차후 도입예정)
        </OnBoardingCardTitle>
        <OnBoardingCardParagraph>
          잘 정리한 포트폴리오, 튜터와 동료평가의 기준이 되는 칭찬배지와 리뷰
          댓글을 바탕으로 부트캠프 수강생들이 수월한 취업 활동을 이어나갈 수
          있도록 채용 프로세스를 도입할 예정이에요. 리크루터들이 수강생들의
          프로필과 프로젝트를 리뷰하고 직접 컨택할 수 있는 기능을 생각하고
          있어요.
        </OnBoardingCardParagraph>
      </OnBoardingCardContainer>
    </OnBoardingContainer>
  );
};

const OnBoardingContainer = styled.div`
  width: 58.75rem;
  margin: 0 auto;
`;

const OnBoardingTitleContainer = styled.div`
  width: 45.625rem;
  margin: 2.9375rem auto 1.8125rem;

  padding-top: 2.625rem;
  padding-bottom: 2.625rem;
`;

const OnBoardingTitle = styled.h1`
  ${({ theme }) => theme.fonts.title36};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 1.5625rem;
`;

const OnBoardingSubTitle = styled.h2`
  ${({ theme }) => theme.fonts.subtitle18};
  color: ${({ theme }) => theme.colors.white};

  word-break: keep-all;
`;

const OnBoardingCardContainer = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray9};
  border-radius: 1rem;
  padding: 3.875rem 6.625rem;

  box-shadow: 0 0.625rem 0.625rem rgba(0, 0, 0, 0.5);

  margin-bottom: 1.5rem;
`;

const OnBoardingCardTitle = styled.h3`
  ${({ theme }) => theme.fonts.title24};
  color: ${({ theme }) => theme.colors.white};

  margin-bottom: 2rem;
`;

const OnBoardingCardParagraph = styled.p`
  ${({ theme }) => theme.fonts.subtitle18};
  color: ${({ theme }) => theme.colors.white};

  word-break: keep-all;
`;

const Point = styled.span`
  color: ${({ theme }) => theme.colors.primary6};
`;

const OnBoardingCardImage = styled(Image)`
  padding-top: 2rem;
  padding-bottom: 3.25rem;

  filter: drop-shadow(0 0.25rem 0.625rem rgba(0, 0, 0, 0.25));

  &:last-child {
    padding-bottom: 0;
  }
`;

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
  };
};

export default OnBoardingPage;

import Image from "next/image";
import styled from "styled-components";
import DetailSideContainer from "./DetailSideContainer";

const DetailSideBadges = () => {
  return (
    <DetailSideContainer>
      <Title>추천 배지</Title>
      <DetailBadgesContainer>
        <BadgeWrapper>
          <Image
            src="/icons/badge-light.svg"
            alt="뱃지"
            width="24"
            height="24"
          />
          <p>4</p>
        </BadgeWrapper>
        <BadgeWrapper>
          <Image
            src="/icons/badge-check.svg"
            alt="뱃지"
            width="24"
            height="24"
          />
          <p>4</p>
        </BadgeWrapper>
        <BadgeWrapper>
          <Image
            src="/icons/badge-code.svg"
            alt="뱃지"
            width="24"
            height="24"
          />
          <p>4</p>
        </BadgeWrapper>
        <BadgeWrapper>
          <Image
            src="/icons/badge-setting.svg"
            alt="뱃지"
            width="24"
            height="24"
          />
          <p>4</p>
        </BadgeWrapper>
      </DetailBadgesContainer>
    </DetailSideContainer>
  );
};

export const Title = styled.div`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.gray5};
`;

const DetailBadgesContainer = styled.div`
  color: ${({ theme }) => theme.colors.gray4};
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;

  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;

const BadgeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.125rem;
`;

export default DetailSideBadges;

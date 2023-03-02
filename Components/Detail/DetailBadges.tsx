import Image from "next/image";
import styled from "styled-components";

const DetailBadges = () => {
  return (
    <DetailBadgesContainer>
      <Title>이 프로젝트를 추천해요</Title>
      <BadgesWrapper>
        <BadgeWrapper>
          <Image
            src="/icons/badge-light.svg"
            alt="뱃지"
            width="36"
            height="36"
          />
          <p>굿아이디어</p>
          <p>4</p>
        </BadgeWrapper>
        <BadgeWrapper>
          <Image
            src="/icons/badge-check.svg"
            alt="뱃지"
            width="36"
            height="36"
          />
          <p>완성도대박</p>
          <p>4</p>
        </BadgeWrapper>
        <BadgeWrapper>
          <Image
            src="/icons/badge-code.svg"
            alt="뱃지"
            width="36"
            height="36"
          />
          <p>훌륭한코드</p>
          <p>4</p>
        </BadgeWrapper>
        <BadgeWrapper>
          <Image
            src="/icons/badge-setting.svg"
            alt="뱃지"
            width="36"
            height="36"
          />
          <p>다양한기능</p>
          <p>4</p>
        </BadgeWrapper>
      </BadgesWrapper>
    </DetailBadgesContainer>
  );
};

const DetailBadgesContainer = styled.div`
  width: 100%;
  padding: 3.5rem 7.5rem;

  border-top: 1px solid ${({ theme }) => theme.colors.gray7};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray7};
`;

export const Title = styled.div`
  font-size: 1.375rem;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 3rem;
`;

const BadgesWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const BadgeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray3};
`;

export default DetailBadges;

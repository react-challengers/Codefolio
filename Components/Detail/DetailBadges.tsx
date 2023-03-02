import Image from "next/image";
import styled from "styled-components";

const DetailBadges = () => {
  return (
    <BadgesWrapper>
      <BadgeWrapper>
        <Image src="/icons/badge-light.svg" alt="뱃지" width="36" height="36" />
        <p>굿아이디어</p>
        <p>4</p>
      </BadgeWrapper>
      <BadgeWrapper>
        <Image src="/icons/badge-check.svg" alt="뱃지" width="36" height="36" />
        <p>완성도대박</p>
        <p>4</p>
      </BadgeWrapper>
      <BadgeWrapper>
        <Image src="/icons/badge-code.svg" alt="뱃지" width="36" height="36" />
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
  );
};
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

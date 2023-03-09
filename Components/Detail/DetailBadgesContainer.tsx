import React from "react";
import styled from "styled-components";
import DetailBadges from "./DetailBadges";

const DetailBadgesContainer = () => {
  return (
    <BadgesContainer>
      <Title>이 프로젝트를 추천해요</Title>
      <DetailBadges />
    </BadgesContainer>
  );
};

const BadgesContainer = styled.div`
  width: 100%;
  padding: 3.5rem 7.5rem;
  margin-top: 2rem;

  border-top: 1px solid ${({ theme }) => theme.colors.gray7};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray7};
`;

export const Title = styled.div`
  ${({ theme }) => theme.fonts.title24};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 3rem;
`;

export default DetailBadgesContainer;

import getPostBadges from "@/utils/APIs/supabase/getPostBadges";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import DetailBadgeModal from "./DetailBadgeModal";
import DetailSideContainer from "./DetailSideContainer";

const DetailSideBadges = () => {
  const router = useRouter();
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [ideaNum, setIdeaNum] = useState(0);
  const [completeNum, setCompleteNum] = useState(0);
  const [codeNum, setCodeNum] = useState(0);
  const [functionNum, setFunctionNum] = useState(0);

  const postId = router.query.id;

  useQuery(["getPostBadge", { postId }], getPostBadges, {
    onSuccess: (data) => {
      if (!data) return;
      let idea = 0;
      let complete = 0;
      let code = 0;
      let func = 0;
      data.forEach(({ type }) => {
        if (type === "idea") idea += 1;
        if (type === "complete") complete += 1;
        if (type === "code") code += 1;
        if (type === "function") func += 1;
      });

      setIdeaNum(idea);
      setCompleteNum(complete);
      setCodeNum(code);
      setFunctionNum(func);
    },
  });

  return (
    <DetailSideContainer>
      <Title>추천 배지</Title>
      <DetailBadgesContainer>
        <OnlyBadgesContainer onClick={() => setShowBadgeModal((prev) => !prev)}>
          <BadgeWrapper>
            <Image
              src="/icons/badge-light.svg"
              alt="뱃지"
              width="24"
              height="24"
            />
            <p>{ideaNum}</p>
          </BadgeWrapper>
          <BadgeWrapper>
            <Image
              src="/icons/badge-check.svg"
              alt="뱃지"
              width="24"
              height="24"
            />
            <p>{completeNum}</p>
          </BadgeWrapper>
          <BadgeWrapper>
            <Image
              src="/icons/badge-code.svg"
              alt="뱃지"
              width="24"
              height="24"
            />
            <p>{codeNum}</p>
          </BadgeWrapper>
          <BadgeWrapper>
            <Image
              src="/icons/badge-setting.svg"
              alt="뱃지"
              width="24"
              height="24"
            />
            <p>{functionNum}</p>
          </BadgeWrapper>
        </OnlyBadgesContainer>
        {showBadgeModal && (
          <DetailBadgeModal closeModal={() => setShowBadgeModal(false)} />
        )}
      </DetailBadgesContainer>
    </DetailSideContainer>
  );
};

export const Title = styled.div`
  ${({ theme }) => theme.fonts.body14}
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.gray5};
`;

const DetailBadgesContainer = styled.div`
  color: ${({ theme }) => theme.colors.gray4};
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  border-radius: 0.5rem;

  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray8};
  }
  position: relative;
`;

const OnlyBadgesContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
`;

const BadgeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.125rem;

  position: relative;
`;

export default DetailSideBadges;

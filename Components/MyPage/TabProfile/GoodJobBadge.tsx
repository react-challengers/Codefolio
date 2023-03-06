import BadgeIcon from "@/Components/MyPage/TabProfile/BadgeIcon";
import styled from "styled-components";
import {
  PUZZLE_ICON_PATH,
  PENCIL_ICON_PATH,
  INITIATIVE_ICON_PATH,
  COMMUNICATION_ICON_PATH,
  IMPLEMENTATION_ICON_PATH,
} from "@/utils/constant";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import getUserBadge from "@/utils/APIs/supabase/getUserBadge";
import { useState } from "react";
import { getCurrentUser } from "@/utils/APIs/supabase";
import getProfileBadgeByUid from "@/utils/APIs/supabase/getProfileBadgeByUid";
import addProfileBadge from "@/utils/APIs/supabase/addProfileBadge";
import deleteProfileBadge from "@/utils/APIs/supabase/deleteProfilePadge";
import { useRouter } from "next/router";
import ConfirmModal from "@/Components/Common/ConfirmModal";
import ProfileComment from "./ProfileComment";
import ProfileCommentInput from "./ProfileCommentInput";

/**
 * @TODO Badge 줄바꿈처리
 */

const GoodJobBadge = () => {
  const router = useRouter();

  const profileId = router.query?.userId?.[0];

  const [showLoginModal, setShowLoginModal] = useState(false);

  const [puzzleNum, setPuzzleNum] = useState(0);
  const [pencilNum, setPencilNum] = useState(0);
  const [arrowNum, setArrowNum] = useState(0);
  const [chatNum, setChatNum] = useState(0);
  const [toolNum, setToolNum] = useState(0);
  const [badgeCheck, setBadgeCheck] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | undefined>("");

  useQuery(["currentUser"], getCurrentUser, {
    onSuccess: ({ data: { user } }) => {
      if (user) setUserId(user.id);
    },
  });

  const { refetch: refetchBadge } = useQuery(
    ["getUserBadge", { profileId }],
    getUserBadge,
    {
      onSuccess: (data) => {
        if (!data) return;

        let puzzle = 0;
        let pencil = 0;
        let arrow = 0;
        let chat = 0;
        let tool = 0;
        data.forEach(({ type }: any) => {
          if (type === "puzzle") puzzle += 1;
          if (type === "pencil") pencil += 1;
          if (type === "arrow") arrow += 1;
          if (type === "chat") chat += 1;
          if (type === "tool") tool += 1;
        });
        setPuzzleNum(puzzle);
        setPencilNum(pencil);
        setArrowNum(arrow);
        setChatNum(chat);
        setToolNum(tool);
      },
    }
  );

  const { refetch: refetchBadgeByUid } = useQuery(
    ["getPostBadgeByUserId", { userId, profileId: "" }],
    getProfileBadgeByUid,
    {
      onSuccess: (data) => {
        const badgeList = data.map((v) => v.type);
        setBadgeCheck(badgeList);
      },
    }
  );

  const { mutate: addBadge } = useMutation(addProfileBadge, {
    onSuccess: () => {
      refetchBadge();
      refetchBadgeByUid();
    },
  });
  const { mutate: deleteBadge } = useMutation(deleteProfileBadge, {
    onSuccess: () => {
      refetchBadge();
      refetchBadgeByUid();
    },
  });

  const clickBadge = (badgeType: ProfileBadge) => {
    if (!userId) {
      setShowLoginModal(true);
      return;
    }

    if (badgeCheck.includes(badgeType)) {
      const newBadgeCheck = badgeCheck.filter((badge) => badge !== badgeType);
      setBadgeCheck(newBadgeCheck);
      deleteBadge({ userId, profileId: profileId as string, type: badgeType });
    } else {
      setBadgeCheck([...badgeCheck, badgeType]);
      addBadge({ userId, profileId: profileId as string, type: badgeType });
    }
  };

  return (
    <>
      <GoodJobTabsContainer>
        <BadgeListContainer>
          <BadgeItemContainer
            onClick={() => clickBadge("puzzle")}
            badgeCheck={badgeCheck}
            badge="puzzle"
          >
            <BadgeIcon d={PUZZLE_ICON_PATH} />
            <BadgeText>문제해결력이 좋아요</BadgeText>
            <BadgeCount>{puzzleNum}</BadgeCount>
          </BadgeItemContainer>

          <BadgeItemContainer
            onClick={() => clickBadge("pencil")}
            badgeCheck={badgeCheck}
            badge="pencil"
          >
            <BadgeIcon d={PENCIL_ICON_PATH} />
            <BadgeText>학습능력이 훌륭해요</BadgeText>
            <BadgeCount>{pencilNum}</BadgeCount>
          </BadgeItemContainer>

          <BadgeItemContainer
            onClick={() => clickBadge("arrow")}
            badgeCheck={badgeCheck}
            badge="arrow"
          >
            <BadgeIcon d={INITIATIVE_ICON_PATH} />
            <BadgeText>자기주도적으로 일해요</BadgeText>
            <BadgeCount>{arrowNum}</BadgeCount>
          </BadgeItemContainer>

          <BadgeItemContainer
            onClick={() => clickBadge("chat")}
            badgeCheck={badgeCheck}
            badge="chat"
          >
            <BadgeIcon d={COMMUNICATION_ICON_PATH} />
            <BadgeText>의사소통이 원활해요</BadgeText>
            <BadgeCount>{chatNum}</BadgeCount>
          </BadgeItemContainer>

          <BadgeItemContainer
            onClick={() => clickBadge("tool")}
            badgeCheck={badgeCheck}
            badge="tool"
          >
            <BadgeIcon d={IMPLEMENTATION_ICON_PATH} />
            <BadgeText>구현도가 높아요</BadgeText>
            <BadgeCount>{toolNum}</BadgeCount>
          </BadgeItemContainer>
        </BadgeListContainer>

        {userId !== profileId && <ProfileCommentInput userId={userId} />}
        <ProfileComment profileId={profileId} />
      </GoodJobTabsContainer>

      {showLoginModal && (
        <ConfirmModal
          bodyText="로그인하시겠습니까?"
          leftText="취소"
          rightText="로그인"
          onClickLeft={() => setShowLoginModal(false)}
          onClickRight={() => router.push("/auth/login")}
        />
      )}
    </>
  );
};

const GoodJobTabsContainer = styled.div`
  width: 100%;
`;

const BadgeListContainer = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 0 7.5rem;
  margin: 3.75rem 0 6rem;
`;

interface BadgeItemContainerProps {
  badgeCheck: string[];
  badge: string;
}

const BadgeItemContainer = styled.li<BadgeItemContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  cursor: pointer;

  color: ${({ theme, badgeCheck, badge }) =>
    theme.colors[badgeCheck.includes(badge) ? "primary6" : "gray3"]};

  path {
    ${({ theme, badgeCheck, badge }) =>
      badgeCheck.includes(badge) && `fill: ${theme.colors.primary6}`};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary6};
    path {
      fill: ${({ theme }) => theme.colors.primary6};
    }
  }
`;

const BadgeText = styled.p`
  ${(props) => props.theme.fonts.body14}
  margin: 0.5rem 0 0.125rem;
`;

const BadgeCount = styled.p`
  ${(props) => props.theme.fonts.subtitle18En}
`;

export default GoodJobBadge;

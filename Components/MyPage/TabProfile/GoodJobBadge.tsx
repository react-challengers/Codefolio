import BadgeIcon from "@/Components/MyPage/TabProfile/BadgeIcon";
import styled from "styled-components";
import {
  PUZZLE_ICON_PATH,
  PENCIL_ICON_PATH,
  INITIATIVE_ICON_PATH,
  COMMUNICATION_ICON_PATH,
  IMPLEMENTATION_ICON_PATH,
} from "@/utils/constant";

/**
 * @TODO Badge 줄바꿈처리
 */

const GoodJobBadge = () => {
  return (
    <GoodJobTabsContainer>
      <BadgeListContainer>
        {/* puzzle */}
        <BadgeItemContainer>
          <BadgeIcon d={PUZZLE_ICON_PATH} highlight />
          <BadgeText>문제해결력이 좋아요</BadgeText>
          <BadgeCount>1</BadgeCount>
        </BadgeItemContainer>

        {/* pencil */}
        <BadgeItemContainer>
          <BadgeIcon d={PENCIL_ICON_PATH} highlight />
          <BadgeText>학습능력이 훌륭해요</BadgeText>
          <BadgeCount>2</BadgeCount>
        </BadgeItemContainer>

        {/* initiative */}
        <BadgeItemContainer>
          <BadgeIcon d={INITIATIVE_ICON_PATH} highlight />
          <BadgeText>자기주도적으로 일해요</BadgeText>
          <BadgeCount>2</BadgeCount>
        </BadgeItemContainer>

        {/* communication */}
        <BadgeItemContainer>
          <BadgeIcon d={COMMUNICATION_ICON_PATH} highlight />
          <BadgeText>의사소통이 원활해요</BadgeText>
          <BadgeCount>3</BadgeCount>
        </BadgeItemContainer>

        {/* implementation */}
        <BadgeItemContainer>
          <BadgeIcon d={IMPLEMENTATION_ICON_PATH} highlight />
          <BadgeText>구현도가 높아요</BadgeText>
          <BadgeCount>3</BadgeCount>
        </BadgeItemContainer>
      </BadgeListContainer>

      {/* comment 자리 */}
    </GoodJobTabsContainer>
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

const BadgeItemContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BadgeText = styled.p`
  ${(props) => props.theme.fonts.body14}
  margin: 0.5rem 0 0.125rem;
`;

const BadgeCount = styled.p`
  ${(props) => props.theme.fonts.subtitle18En}
`;

export default GoodJobBadge;

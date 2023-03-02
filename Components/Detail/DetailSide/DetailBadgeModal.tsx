import styled from "styled-components";
import DetailBadges from "../DetailBadges";

const DetailBadgeModal = () => {
  return (
    <DetailBadgeModalContainer>
      <DetailBadges />
    </DetailBadgeModalContainer>
  );
};

const DetailBadgeModalContainer = styled.div`
  position: absolute;
  top: 480px;
  left: 140px;
  background-color: ${({ theme }) => theme.colors.gray8};

  padding: 32px;

  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
`;

export default DetailBadgeModal;

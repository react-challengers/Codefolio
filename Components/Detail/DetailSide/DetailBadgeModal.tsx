import styled from "styled-components";
import DetailBadges from "../DetailBadges";

interface DetailBadgeModalProps {
  closeModal: () => void;
}

const DetailBadgeModal = ({ closeModal }: DetailBadgeModalProps) => {
  return (
    <DetailBadgeModalContainer>
      <DetailBadges closeModal={closeModal} />
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

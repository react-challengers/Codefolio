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
  top: 30rem;
  left: 8.75rem;
  background-color: ${({ theme }) => theme.colors.gray8};

  padding: 32px;

  box-shadow: 0rem 0.625rem 0.625rem rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem;
`;

export default DetailBadgeModal;

import useOutsideClick from "@/hooks/query/useOutsideClick";
import { useRef } from "react";
import styled from "styled-components";
import DetailBadges from "../DetailBadges";

interface DetailBadgeModalProps {
  closeModal: () => void;
}

const DetailBadgeModal = ({ closeModal }: DetailBadgeModalProps) => {
  const badgeModalRef = useRef<any>();

  useOutsideClick(badgeModalRef, () => closeModal());

  return (
    <DetailBadgeModalContainer ref={badgeModalRef}>
      <DetailBadges closeModal={closeModal} />
    </DetailBadgeModalContainer>
  );
};

const DetailBadgeModalContainer = styled.div`
  position: absolute;
  left: 0;
  top: 3.25rem;
  background-color: ${({ theme }) => theme.colors.gray8};
  z-index: 2;
  width: 26.25rem;
  padding: 2rem;
  filter: drop-shadow(0 0 4 rgba(0, 0, 0, 0.12))
    drop-shadow(0.125rem 0.375rem 0.75rem rgba(0, 0, 0, 0.12));
  border-radius: 0.5rem;
`;

export default DetailBadgeModal;

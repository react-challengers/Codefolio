import { useStopScroll } from "@/hooks/common";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import DetailArticle from "../Detail/DetailArticle";

interface DetailModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const DetailModal = ({ setIsModalOpen }: DetailModalProps) => {
  const router = useRouter();

  useStopScroll();

  const handleOnClose = async () => {
    await router.push("/");
    setIsModalOpen(false);
  };

  return (
    <ModalContainer key={router.asPath}>
      <ModalBackDrop onClick={handleOnClose}>
        <DetailModalContainer>
          <DetailArticle />
        </DetailModalContainer>
      </ModalBackDrop>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const ModalBackDrop = styled.div`
  padding: 1.24rem 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const DetailModalContainer = styled.div`
  width: 87.5rem;
  margin: 0 auto;
`;

export default DetailModal;

import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import DetailArticle from "../Detail/DetailArticle";

interface DetailModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const DetailModal = ({ setIsModalOpen }: DetailModalProps) => {
  const router = useRouter();

  const handleOnClose = async () => {
    await router.push("/");
    setIsModalOpen(false);
  };

  return (
    <ModalContainer key={router.asPath}>
      <ModalBackDrop onClick={() => handleOnClose()} />
      <DetailModalContainer>
        <DetailArticle />
      </DetailModalContainer>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  padding: 1.25rem 0;
`;

const ModalBackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const DetailModalContainer = styled.div`
  position: relative;
  width: 87.5rem;
  margin: 0 auto;
  z-index: 2;
`;

export default DetailModal;

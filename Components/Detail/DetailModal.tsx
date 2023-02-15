import DetailPage from "@/pages/detail/[id]";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

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
        <DetailPage />
      </DetailModalContainer>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  padding: 20px 0;
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

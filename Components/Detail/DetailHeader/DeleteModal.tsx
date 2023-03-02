import React from "react";
import styled from "styled-components";

interface DeleteModalProps {
  onCancel: () => void;
  onDelete: () => void;
}

const DeleteModal = ({ onCancel, onDelete }: DeleteModalProps) => {
  return (
    <DeleteModalContainer>
      <ModalContainer>
        <ModalBody>글을 삭제하시겠습니까?</ModalBody>
        <ModalFooter>
          <CancelButton onClick={onCancel}>취소</CancelButton>
          <DeleteButton onClick={onDelete}>삭제</DeleteButton>
        </ModalFooter>
      </ModalContainer>
    </DeleteModalContainer>
  );
};

const DeleteModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  box-shadow: 0px 0.25rem 0.625rem rgba(0, 0, 0, 0.25);
  border-radius: 0.25rem;
  width: 20.5rem;
  background-color: #1c1c1c;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalBody = styled.div`
  padding: 4.0625rem 0;
  color: white;
`;

const ModalFooter = styled.div`
  display: flex;
  width: 100%;
  height: 3.75rem;
`;

const Button = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const CancelButton = styled(Button)`
  color: white;
  background-color: ${({ theme }) => theme.colors.gray4};
  border-bottom-left-radius: 4px;
`;

const DeleteButton = styled(Button)`
  color: black;
  background-color: ${({ theme }) => theme.colors.primary4};
  border-bottom-right-radius: 4px;
`;

export default DeleteModal;

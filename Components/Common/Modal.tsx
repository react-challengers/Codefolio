import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface ModalProps {
  onClose: () => void;
  children?: string | null | undefined;
  title?: string | null;
}

const Modal = ({ onClose, children, title }: ModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = (
    <StyledModalOverlay onClick={() => onClose()}>
      {/* Wrap the whole Modal inside the newly created StyledModalWrapper 
            and use the ref
        */}
      <StyledModalWrapper>
        {title && <StyledModalTitle>{title}</StyledModalTitle>}
        {children ? (
          <StyledModalBody>{children}</StyledModalBody>
        ) : (
          <StyledModalBody>
            {`계속 진행을 위해서는 "확인" 버튼을 눌러주세요.`}
          </StyledModalBody>
        )}
        <ButtonWrapper>
          <Checkbutton onClick={() => onClose()}> 확인 </Checkbutton>
        </ButtonWrapper>
      </StyledModalWrapper>
    </StyledModalOverlay>
  );

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root") as Element
    );
  }
  return null;
};

const StyledModalTitle = styled.h1`
  font-size: 1.5rem;
`;

const StyledModalBody = styled.div`
  margin-top: 1rem;

  height: 4rem;
`;

// the wrapper component
const StyledModalWrapper = styled.div`
  width: 32rem;
  height: 12rem;
  background: white;

  border-radius: 1rem;
  padding: 1.5rem;
`;

const ButtonWrapper = styled.div`
  display: flex;

  justify-content: end;
`;

const Checkbutton = styled.button`
  background-color: #4b8bed;
  border-radius: 0.5rem;
  border: #4b8bed;

  height: 2rem;
  width: 3.75rem;

  color: white;
  font-size: 1rem;
  font-weight: bold;

  cursor: pointer;

  position: absolute;
`;

const StyledModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default Modal;

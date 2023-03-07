import useOutsideClick from "@/hooks/query/useOutsideClick";
import React, { useRef } from "react";
import styled from "styled-components";

type MoralType = "normal" | "warn";

interface ConfirmModalProps {
  bodyText: string;
  leftText: string;
  rightText: string;
  type?: MoralType;
  onClickLeft: () => void;
  onClickRight: () => void;
}

const ConfirmModal = ({
  bodyText,
  leftText,
  rightText,
  onClickLeft,
  onClickRight,
  type = "normal",
}: ConfirmModalProps) => {
  const modalRef = useRef<any>();

  useOutsideClick(modalRef, () => onClickLeft());

  return (
    <ConfirmModalContainer>
      <ModalContainer ref={modalRef}>
        <ModalBody>{bodyText}</ModalBody>
        <ModalFooter>
          <LeftButton onClick={onClickLeft}>{leftText}</LeftButton>
          <RightButton onClick={onClickRight} type={type}>
            {rightText}
          </RightButton>
        </ModalFooter>
      </ModalContainer>
    </ConfirmModalContainer>
  );
};

const ConfirmModalContainer = styled.div`
  position: fixed;
  z-index: 2;
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
  background-color: ${({ theme }) => theme.colors.gray11};

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

const LeftButton = styled(Button)`
  color: white;
  background-color: ${({ theme }) => theme.colors.gray4};
  border-bottom-left-radius: 4px;
`;

const RightButton = styled(Button)<{ type: MoralType }>`
  color: ${({ theme, type }) =>
    theme.colors[type === "normal" ? "black" : "white"]};
  background-color: ${({ theme, type }) =>
    theme.colors[type === "normal" ? "primary6" : "messageError"]};
  border-bottom-right-radius: 4px;
`;

export default ConfirmModal;

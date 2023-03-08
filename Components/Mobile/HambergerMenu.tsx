import useOutsideClick from "@/hooks/query/useOutsideClick";
import close from "@/public/icons/close.svg";
import { userLoginCheck } from "@/lib/recoil";
import Image from "next/image";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

type HambergerMenuProps = {
  setIsHambergerModal: (value: boolean) => void;
};
const HambergerMenu = ({ setIsHambergerModal }: HambergerMenuProps) => {
  const [userCheck, setUserCheck] = useRecoilState(userLoginCheck);

  const HambergerModalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(HambergerModalRef, () => setIsHambergerModal(false));

  return (
    <HambergerModal>
      <HambergerModalContainer ref={HambergerModalRef}>
        <CloseIconSection>
          <Image src={close} width={24} height={24} alt="닫기" />
        </CloseIconSection>
        <MobilePageList>
          <li>Codefolio 소개</li>
          {userCheck ? (
            <>
              <li>1</li>
              <li>1</li>
            </>
          ) : (
            <li>로그인</li>
          )}
        </MobilePageList>
      </HambergerModalContainer>
    </HambergerModal>
  );
};

const HambergerModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
`;

const HambergerModalContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 15.625rem;
  height: 100%;

  border-top-right-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.gray11};
`;

const CloseIconSection = styled.div`
  width: auto;
  padding: 1.625rem 0 1.125rem 1rem;
`;

const MobilePageList = styled.ul`
  list-style: none;
  li {
    padding: 1rem;
    ${({ theme }) => theme.fonts.body16}
    color: ${({ theme }) => theme.colors.white};
  }
`;

export default HambergerMenu;

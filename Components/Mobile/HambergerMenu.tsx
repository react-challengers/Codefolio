import useOutsideClick from "@/hooks/query/useOutsideClick";
import close from "@/public/icons/close.svg";
import { userLoginCheck } from "@/lib/recoil";
import Image from "next/image";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import supabase from "@/lib/supabase";

type HambergerMenuProps = {
  setIsHambergerModal: (value: boolean) => void;
};
const HambergerMenu = ({ setIsHambergerModal }: HambergerMenuProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [userCheck, setUserCheck] = useRecoilState(userLoginCheck);

  const mobileUserMenuList = ["프로필", "글 작성하기", "로그아웃"];
  const mobileGuestMenuList = ["로그인"];

  const HambergerModalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(HambergerModalRef, () => setIsHambergerModal(false));

  const clickLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
    queryClient.invalidateQueries(["USER_PROFILE"]);
    setUserCheck(false);
  };

  const onClickPush = (list: string) => {
    setIsHambergerModal(false);
    switch (list) {
      case "소개":
        router.push("/on-boarding");
        break;
      case "프로필":
        router.push("/profile");
        break;
      case "글 작성하기":
        router.push("/m-preparing");
        break;
      case "로그아웃":
        clickLogout();
        router.push("/");
        break;
      case "로그인":
        router.push("/auth/login");
        break;

      default:
        break;
    }
  };

  return (
    <HambergerModal>
      <HambergerModalContainer ref={HambergerModalRef}>
        <CloseIconSection onClick={() => setIsHambergerModal(false)}>
          <Image src={close} width={24} height={24} alt="닫기" />
        </CloseIconSection>

        <MobilePageList>
          <MobilePage onClick={() => onClickPush("소개")}>
            Codefolio 소개
          </MobilePage>
          {userCheck
            ? mobileUserMenuList.map((list) => (
                <MobilePage key={list} onClick={() => onClickPush(list)}>
                  {list}
                </MobilePage>
              ))
            : mobileGuestMenuList.map((list) => (
                <MobilePage key={list} onClick={() => onClickPush(list)}>
                  {list}
                </MobilePage>
              ))}
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
  display: flex;
  align-items: center;

  padding: 0 1rem;
  height: 3.5rem;
`;

const MobilePageList = styled.ul`
  list-style: none;
`;

const MobilePage = styled.li`
  padding: 1rem;
  ${({ theme }) => theme.fonts.body16}
  color: ${({ theme }) => theme.colors.white};

  cursor: pointer;
  transition: all 0.4s ease-in-out;

  :hover {
    background-color: ${({ theme }) => theme.colors.gray10};
  }
`;
export default HambergerMenu;

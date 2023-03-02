import {
  subCategoryState,
  userLoginCheck as recoilUserLoginCheck,
} from "@/lib/recoil";
import supabase from "@/lib/supabase";
import { getCurrentUser, getUserProfile } from "@/utils/APIs/supabase";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { DropDown, ProfileImage } from "../Common";
import SearchBar from "./SearchBar";

const GNB = () => {
  const router = useRouter();
  const [userCheck, setUserCheck] = useRecoilState(recoilUserLoginCheck);
  const resetSubCategoryState = useResetRecoilState(subCategoryState);
  const [currentUserProfileImage, setCurrentUserProfileImage] =
    useState<string>("");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  useQuery(["currentUser"], {
    queryFn: getCurrentUser,
    onSuccess({ data: { user } }) {
      if (user) {
        setUserCheck(true);
      } else {
        setUserCheck(false);
      }
    },
  });

  useQuery(["USER_PROFILE"], getUserProfile, {
    onSuccess: (data) => {
      if (data?.profile_image) {
        setCurrentUserProfileImage(data.profile_image);
      }
    },
  });

  const handleClickLogo = () => {
    resetSubCategoryState();
    router.push("/");
  };

  const dropDownItems = ["프로필", "로그아웃"];

  const handleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
    setUserCheck(false);
    router.push("/");
  };

  const handleDropDownItemClick = (item: string) => {
    if (item === "프로필") {
      router.push("/profile");
      setIsProfileDropdownOpen(false);
    } else if (item === "로그아웃") {
      handleLogout();
      setIsProfileDropdownOpen(false);
    }
  };

  if (router.pathname.includes("auth")) return <> </>;

  return (
    <GNBContainer>
      <GNBLeftSideContainer>
        <ButtonWrapper onClick={handleClickLogo}>
          <GNBLogo>Codefolio</GNBLogo>
        </ButtonWrapper>
        <SearchBar />
      </GNBLeftSideContainer>
      <ButtonsContainer>
        {userCheck ? (
          <>
            <ButtonWrapper onClick={() => null}>
              <Image
                src="/icons/notification.svg"
                alt="알림 아이콘"
                width="24"
                height="24"
              />
            </ButtonWrapper>
            <ButtonWrapper
              onClick={() =>
                router.push(userCheck ? "/create-post" : "/auth/login")
              }
            >
              <Image
                src="/icons/post.svg"
                alt="게시글 등록 아이콘"
                width="24"
                height="24"
              />
            </ButtonWrapper>
            <ButtonWrapper onClick={handleProfileDropdown}>
              <ProfileImage
                page="GNB"
                alt="내 프로필 이미지"
                src={currentUserProfileImage}
              />
            </ButtonWrapper>
            <ProfileDropDownList>
              {isProfileDropdownOpen &&
                dropDownItems.map((item) => (
                  <DropDown
                    key={item}
                    item={item}
                    onClickHandler={handleDropDownItemClick}
                  />
                ))}
            </ProfileDropDownList>
          </>
        ) : (
          <ButtonWrapper onClick={() => router.push("/auth/login")}>
            <span>LOGIN</span>
          </ButtonWrapper>
        )}
      </ButtonsContainer>
    </GNBContainer>
  );
};

const GNBContainer = styled.div`
  width: 100vw;
  height: 3.5rem;
  background-color: ${({ theme }) => theme.colors.gray10};
  position: sticky;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.5rem;
`;

const GNBLeftSideContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

const ButtonWrapper = styled.div`
  cursor: pointer;
  padding: 0.5rem;
`;

const GNBLogo = styled.div`
  ${({ theme }) => theme.fonts.title24};
  color: ${({ theme }) => theme.colors.primary6};
`;

const ProfileDropDownList = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 3.75rem;
  width: 11.25rem;

  background-color: ${({ theme }) => theme.colors.gray9};
  ${({ theme }) => theme.fonts.body14};
  color: ${({ theme }) => theme.colors.white};

  border-radius: 0.25rem;
  filter: drop-shadow(0px 0.625rem 0.625rem rgba(0, 0, 0, 0.5));
  z-index: 2;
`;

export default GNB;

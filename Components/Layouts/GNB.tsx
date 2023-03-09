import { useSubscribeRoute } from "@/hooks/common";
import useIsMobile from "@/hooks/common/useIsMobile";
import useOutsideClick from "@/hooks/query/useOutsideClick";
import {
  isNotificationState,
  subCategoryState,
  userLoginCheck as recoilUserLoginCheck,
} from "@/lib/recoil";
import supabase from "@/lib/supabase";
import {
  getCurrentUser,
  getNotification,
  getUserProfile,
} from "@/utils/APIs/supabase";
import hamberger_menu from "@/public/icons/Mobile/hamberger_menu.svg";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { DropDown, ProfileImage } from "../Common";
import CreatePostIcon from "./CreatePostIcon";
import Notification from "./Notification";
import NotificationIcons from "./NotificationIcons";
import SearchBar from "./SearchBar";
import HambergerMenu from "../Mobile/HambergerMenu";

const GNB = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();
  const [userCheck, setUserCheck] = useRecoilState(recoilUserLoginCheck);
  const resetSubCategoryState = useResetRecoilState(subCategoryState);
  const [currentUserProfileImage, setCurrentUserProfileImage] =
    useState<string>("");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isHambergerModal, setIsHambergerModal] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useRecoilState(isNotificationState);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [notificationType, setNotificationType] = useState<"new" | "default">(
    "default"
  );
  const isEmptySearchValue = router.asPath === ("/search?q=" as string);

  const profileDropdownRef = useRef<HTMLUListElement>(null);
  useOutsideClick(profileDropdownRef, () => setIsProfileDropdownOpen(false));

  const NotificationDropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(NotificationDropdownRef, () =>
    setIsNotificationDropdownOpen(false)
  );

  useQuery(["currentUser"], {
    queryFn: getCurrentUser,
    onSuccess({ data: { user } }) {
      if (user) {
        setUserCheck(true);
        setCurrentUserId(user.id);
      } else {
        setUserCheck(false);
      }
    },
  });

  useQuery(["USER_PROFILE"], () => getUserProfile(), {
    onSuccess: (data) => {
      if (data?.profile_image) {
        setCurrentUserProfileImage(data.profile_image);
      }
    },
  });

  const { data: notifications } = useQuery<NotificationType[]>(
    ["notification", currentUserId],
    {
      queryFn: ({ queryKey }) => getNotification(queryKey[1] as string),
      enabled: !!currentUserId,
    }
  );

  useEffect(() => {
    if (notifications?.some((notification) => !notification.is_read)) {
      setNotificationType("new");
    } else {
      setNotificationType("default");
    }
  }, [notifications]);

  const handleClickLogo = () => {
    resetSubCategoryState();
    router.push("/");
  };

  const dropDownItems = ["프로필", "로그아웃"];

  const handleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const handleNotificationDropdown = () => {
    setIsNotificationDropdownOpen((prev) => !prev);
    if (isProfileDropdownOpen) setIsProfileDropdownOpen(false);
  };

  const handleResetDropdowns = () => {
    setIsProfileDropdownOpen(false);
    setIsNotificationDropdownOpen(false);
  };

  const handleClickMobileMenu = () => {
    setIsHambergerModal((prev) => !prev);
  };

  useSubscribeRoute(handleResetDropdowns);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
    queryClient.invalidateQueries(["USER_PROFILE"]);
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
        {isMobile ? (
          <>
            <ButtonWrapper
              onClick={handleClickMobileMenu}
              isOpen={isHambergerModal}
            >
              <Image
                src={hamberger_menu}
                width={24}
                height={24}
                alt="모바일 메뉴 버튼"
              />
            </ButtonWrapper>
            {isHambergerModal && (
              <HambergerMenu setIsHambergerModal={setIsHambergerModal} />
            )}
          </>
        ) : (
          <ButtonWrapper onClick={handleClickLogo}>
            <Image
              src="/logos/mainLogo.svg"
              width={24}
              height={24}
              alt="코드폴리오 로고"
            />
          </ButtonWrapper>
        )}
        {!isEmptySearchValue && <SearchBar />}
      </GNBLeftSideContainer>
      <ButtonsContainer>
        {userCheck ? (
          <>
            <ButtonWrapper
              onClick={handleNotificationDropdown}
              isOpen={isNotificationDropdownOpen}
            >
              <NotificationIcon type={notificationType} />
            </ButtonWrapper>
            {isNotificationDropdownOpen && (
              <NotificationContainer ref={NotificationDropdownRef}>
                <Notification />
              </NotificationContainer>
            )}
            {!isMobile && (
              <ButtonWrapper
                onClick={() =>
                  router.push(userCheck ? "/create-post" : "/auth/login")
                }
              >
                <CreatePostIcon />
              </ButtonWrapper>
            )}
            <ButtonWrapper onClick={handleProfileDropdown}>
              <ProfileImage
                page="GNB"
                alt="내 프로필 이미지"
                src={currentUserProfileImage}
              />
            </ButtonWrapper>
            <ProfileDropDownList ref={profileDropdownRef}>
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
          !isMobile && (
            <ButtonWrapper onClick={() => router.push("/auth/login")}>
              <LoginButton>로그인</LoginButton>
            </ButtonWrapper>
          )
        )}
      </ButtonsContainer>
    </GNBContainer>
  );
};

const NotificationContainer = styled.div`
  position: absolute;
  top: 3.75rem;
  right: 2.5rem;
`;

const GNBContainer = styled.div`
  width: 100%;
  height: 3.5rem;
  background-color: ${({ theme }) => theme.colors.gray10};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.5rem;

  @media (max-width: 768px) {
    padding: 0.375rem 1rem;
  }
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

interface ButtonWrapperProps {
  isOpen?: boolean;
}

const ButtonWrapper = styled.div<ButtonWrapperProps>`
  cursor: pointer;
  padding: 0.5rem;
  @media (max-width: 768px) {
    padding: 0;
  }

  path,
  circle {
    transition: all 0.2s ease-in-out;
  }

  ${({ isOpen, theme }) =>
    isOpen &&
    `path {
      fill: ${theme.colors.primary6};
    }
    circle {
      fill: ${theme.colors.primary6};
    }`}

  &:hover {
    path {
      fill: ${({ theme }) => theme.colors.primary6};
    }
    circle {
      fill: ${({ theme }) => theme.colors.primary6};
    }
  }
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

const LoginButton = styled.button`
  ${({ theme }) => theme.fonts.body16};
  color: ${({ theme }) => theme.colors.gray4};
  height: 2.25rem;
  width: 5.875rem;
  background: none;
  cursor: pointer;

  border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-radius: 0.25rem;

  transition: all 0.2s ease-in-out;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primary6};
    color: ${({ theme }) => theme.colors.primary6};
  }
`;

const NotificationIcon = styled(NotificationIcons)`
  cursor: pointer;
`;

export default GNB;

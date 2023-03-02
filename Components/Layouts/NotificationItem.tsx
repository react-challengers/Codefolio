import { isNotificationState } from "@/lib/recoil";
import { getSingleUser, postNotificationRead } from "@/utils/APIs/supabase";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ProfileImage } from "../Common";
import NotificationBookmarkIcon from "./NotificationBookmarkIcon";
import NotificationCommentIcon from "./NotificationCommentIcon";
import NotificationLikeIcon from "./NotificationLikeIcon";

interface NotificationItemProps {
  notification: NotificationType;
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  const router = useRouter();
  const [notificationUserProfileImage, setNotificationUserProfileImage] =
    useState<string>("");

  const [notificationUserName, setNotificationUserName] = useState<string>("");

  const setIsNotificationDropdownOpen = useSetRecoilState(isNotificationState);

  useQuery(["notificationUser", notification.user_id], {
    queryFn: () => getSingleUser(notification.user_id),
    onSuccess: (data) => {
      if (data?.profile_image) {
        setNotificationUserProfileImage(data.profile_image);
      }
      if (data?.user_name) {
        setNotificationUserName(data.user_name);
      }
    },
  });

  const { mutate: notificationMutate } = useMutation(
    ["notification", notification.id],
    postNotificationRead
  );

  const onClickNotificationHandler = () => {
    notificationMutate(notification.id);
    switch (notification.type) {
      case "like":
        router.push(`/detail/${notification.post_id}`);
        break;
      case "comment":
        router.push(`/detail/${notification.post_id}`);
        break;
      case "bookmark":
        router.push(`/detail/${notification.post_id}`);
        break;
      // case "badge", "profile_badge" 추가
      default:
        break;
    }
    setIsNotificationDropdownOpen(false);
  };

  return (
    <NotificationItemContainer
      isRead={notification.is_read}
      onClick={onClickNotificationHandler}
    >
      <NotificationProfileImageContainer>
        <ProfileImage
          src={notificationUserProfileImage}
          alt="유져 프로필사진"
          page="GNB"
        />
        <NotificationTypeIcon>
          {notification.type === "like" && <NotificationLikeIcon />}
          {notification.type === "comment" && <NotificationCommentIcon />}
          {notification.type === "bookmark" && <NotificationBookmarkIcon />}
        </NotificationTypeIcon>
      </NotificationProfileImageContainer>
      <NotificationContentContainer>
        <NotificationContent>
          {notificationUserName}
          {notification.content}
        </NotificationContent>
      </NotificationContentContainer>
    </NotificationItemContainer>
  );
};

interface NotificationItemContainerProps {
  isRead: boolean;
}

const NotificationItemContainer = styled.div<NotificationItemContainerProps>`
  display: flex;
  align-items: center;
  gap: 1rem;

  padding: 0.875rem 1rem;

  cursor: pointer;

  &:first-of-type {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  &:last-of-type {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }

  ${({ isRead, theme }) =>
    !isRead && `background-color: ${theme.colors.gray8};`}
`;

const NotificationProfileImageContainer = styled.div`
  position: relative;
  width: 2.625rem;
  height: 2.625rem;
`;

const NotificationTypeIcon = styled.div`
  position: absolute;
  bottom: -2px;
  right: -2px;
`;

const NotificationContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const NotificationContent = styled.div`
  ${({ theme }) => theme.fonts.body14};
  color: ${({ theme }) => theme.colors.gray2};
`;

export default NotificationItem;

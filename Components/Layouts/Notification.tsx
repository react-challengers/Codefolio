import { getCurrentUser, getNotification } from "@/utils/APIs/supabase";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SyncLoader } from "react-spinners";
import styled from "styled-components";
import NotificationItem from "./NotificationItem";

const Notification = () => {
  const [currentUserId, setCurrentUserId] = useState<string>("");

  useQuery(["currentUser"], getCurrentUser, {
    onSuccess: ({ data }) => {
      if (data?.user?.id) {
        setCurrentUserId(data.user.id);
      }
    },
  });

  const { data: notifications, isLoading } = useQuery<NotificationType[]>(
    ["notification", currentUserId],
    {
      queryFn: ({ queryKey }) => getNotification(queryKey[1] as string),
      enabled: !!currentUserId,
    }
  );

  if (isLoading)
    return (
      <NotificationContainer>
        <EmptyNotification>
          <Loader color="#3DDFE9" margin={4} size={16} speedMultiplier={1} />
        </EmptyNotification>
      </NotificationContainer>
    );

  if (notifications?.length === 0)
    return (
      <NotificationContainer>
        <EmptyNotification>알림이 없습니다.</EmptyNotification>
      </NotificationContainer>
    );

  return (
    <NotificationContainer>
      {notifications?.map((notification) => {
        return (
          <NotificationItem key={notification.id} notification={notification} />
        );
      })}
    </NotificationContainer>
  );
};

const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray9};
  border: 1px solid ${({ theme }) => theme.colors.gray8};
  border-radius: 0.5rem;
  width: 22.5rem;
  max-height: 25rem;
  overflow-y: scroll;

  position: absolute;
  top: 3.75rem;
  right: 2.5rem;

  box-shadow: 0px 0.625rem 0.625rem rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem;

  z-index: 3;
`;

const EmptyNotification = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 9rem;
  width: 100%;

  ${({ theme }) => theme.fonts.body16};
  color: ${({ theme }) => theme.colors.gray2};
`;

const Loader = styled(SyncLoader)`
  position: absolute;
`;

export default Notification;

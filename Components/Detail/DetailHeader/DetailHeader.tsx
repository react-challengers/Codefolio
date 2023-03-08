import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import styled from "styled-components";
import {
  addBookmark,
  addLike,
  decrementBookmark,
  decrementLike,
  deleteBookmark,
  deleteLike,
  getOnePost,
  incrementBookmark,
  incrementLike,
} from "@/utils/APIs/supabase";
import supabase from "@/lib/supabase";
import createNotificationContent from "@/utils/notification/createNotificationContent";
import _ from "lodash";
import ShowMoreModal from "./ShowMoreModal";

interface DetailHeaderProps {
  isBookmark: boolean;
  isLike: boolean;
  setIsBookmark: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLike: React.Dispatch<React.SetStateAction<boolean>>;
  currentUserId: string;
}

const DetailHeader = ({
  isBookmark,
  isLike,
  setIsBookmark,
  setIsLike,
  currentUserId,
}: DetailHeaderProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    query: { id: postId }, // c078f3bf-4e86-44a2-a672-583f36c1aa8f
  } = useRouter();
  const [showMore, setShowMore] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [author, setAuthor] = useState("");

  const { data: currentPost } = useQuery<PostType>(["getOnePost", postId], {
    queryFn: ({ queryKey }) => getOnePost(queryKey[1] as string),
    onSuccess: (data) => {
      if (data) {
        setPostTitle(data.title);
        setAuthor(data.user_id);
      }
    },
  });

  const showMoreModal = () => setShowMore((prev) => !prev);

  // 추후 리팩토링 대상(결합도가 높음)
  const { mutate: addNotificationMutate } = useMutation(
    async (type: string) => {
      await supabase
        .from("notification")
        .insert({
          user_id: currentUserId,
          target_id: author,
          post_id: postId as string,
          content: createNotificationContent(type, postTitle),
          is_read: false,
          type,
        })
        .single();
    }
  );

  // 추후 리팩토링 대상(결합도가 높음)
  const { mutate: deleteNotificationMutate } = useMutation(
    async (type: string) => {
      await supabase
        .from("notification")
        .delete()
        .match({
          user_id: currentUserId,
          target_id: author,
          post_id: postId as string,
          type,
        });
    }
  );

  const { mutate: addBookmarkMutate } = useMutation(addBookmark, {
    onMutate: async (newBookmarkItem) => {
      await queryClient.cancelQueries(["getBookmark", newBookmarkItem.postId]);
      const previousBookmark = queryClient.getQueryData<BookmarkType>([
        "getBookmark",
        newBookmarkItem.postId,
      ]);

      if (previousBookmark) {
        queryClient.setQueryData(["getBookmark", newBookmarkItem.postId], {
          ...previousBookmark,
          newBookmarkItem,
        });
      }
      return { previousBookmark };
    },
    onError: (err, newBookmarkItem, context) => {
      if (context?.previousBookmark) {
        queryClient.setQueryData(["getBookmark", newBookmarkItem.postId], {
          ...context.previousBookmark,
        });
      }
    },
    onSuccess: async () => {
      addNotificationMutate("bookmark");
      setIsBookmark(true);
    },
  });

  const { mutate: deleteBookmarkMutate } = useMutation(deleteBookmark, {
    onMutate: async (deleteBookmarkItem) => {
      await queryClient.cancelQueries([
        "getBookmark",
        deleteBookmarkItem.postId,
      ]);
      const previousBookmark = queryClient.getQueryData<BookmarkType>([
        "getBookmark",
        deleteBookmarkItem.postId,
      ]);

      if (previousBookmark) {
        queryClient.setQueryData(
          ["getBookmark", deleteBookmarkItem.postId],
          null
        );
      }
      return { previousBookmark };
    },
    onError: (err, deleteBookmarkItem, context) => {
      if (context?.previousBookmark) {
        queryClient.setQueryData(["getBookmark", deleteBookmarkItem.postId], {
          ...context.previousBookmark,
        });
      }
    },
    onSuccess: async () => {
      deleteNotificationMutate("bookmark");
      setIsBookmark(false);
    },
  });

  const { mutate: addLikeMutate } = useMutation(addLike, {
    onMutate: async (newLikeItem) => {
      await queryClient.cancelQueries(["getLike", newLikeItem.postId]);
      const previousLike = queryClient.getQueryData<LikeType>([
        "getLike",
        newLikeItem.postId,
      ]);

      if (previousLike) {
        queryClient.setQueryData(["getLike", newLikeItem.postId], {
          ...previousLike,
          newLikeItem,
        });
      }
      return { previousLike };
    },
    onError: (err, newLikeItem, context) => {
      if (context?.previousLike) {
        queryClient.setQueryData(["getLike", newLikeItem.postId], {
          ...context.previousLike,
        });
      }
    },
    onSuccess: async () => {
      addNotificationMutate("like");
      setIsLike(true);
    },
  });

  const { mutate: deleteLikeMutate } = useMutation(deleteLike, {
    onMutate: async (deleteLikeItem) => {
      await queryClient.cancelQueries(["getLike", deleteLikeItem.postId]);
      const previousLike = queryClient.getQueryData<LikeType>([
        "getLike",
        deleteLikeItem.postId,
      ]);

      if (previousLike) {
        queryClient.setQueryData(["getLike", deleteLikeItem.postId], null);
      }
      return { previousLike };
    },
    onError: (err, deleteLikeItem, context) => {
      if (context?.previousLike) {
        queryClient.setQueryData(["getLike", deleteLikeItem.postId], {
          ...context.previousLike,
        });
      }
    },
    onSuccess: async () => {
      deleteNotificationMutate("like");
      setIsLike(false);
    },
  });

  const addBookmarkThrottle = useCallback(
    _.throttle(
      () => {
        addBookmarkMutate({ postId: postId as string, currentUserId });
        incrementBookmark(postId as string);
        queryClient.invalidateQueries(["GET_POSTS"]);
      },
      500,
      { leading: true, trailing: false }
    ),
    []
  );

  const deleteBookmarkThrottle = useCallback(
    _.throttle(
      () => {
        deleteBookmarkMutate({ postId: postId as string, currentUserId });
        decrementBookmark(postId as string);
        queryClient.invalidateQueries(["GET_POSTS"]);
      },
      500,
      { leading: true, trailing: false }
    ),
    []
  );

  const clickBookmarkButton = async () => {
    if (!currentUserId) {
      return router.push("/auth/login");
    }
    if (isBookmark) {
      return deleteBookmarkThrottle();
    }
    return addBookmarkThrottle();
  };

  const deleteLikeThrottle = useCallback(
    _.throttle(
      () => {
        deleteLikeMutate({ postId: postId as string, currentUserId });
        decrementLike(postId as string);
        queryClient.invalidateQueries(["GET_POSTS"]);
      },
      500,
      { leading: true, trailing: false }
    ),
    []
  );

  const addLikeThrottle = useCallback(
    _.throttle(
      () => {
        addLikeMutate({ postId: postId as string, currentUserId });
        incrementLike(postId as string);
        queryClient.invalidateQueries(["GET_POSTS"]);
      },
      500,
      { leading: true, trailing: false }
    ),
    []
  );

  const clickLikeButton = async () => {
    if (!currentUserId) {
      return router.push("/auth/login");
    }

    if (isLike) {
      return deleteLikeThrottle();
    }
    return addLikeThrottle();
  };

  return (
    <DetailHeaderContainer>
      <ButtonWrapper>
        <Image
          src={`/icons/like${isLike ? "Hover" : ""}.svg`}
          width={24}
          height={24}
          alt="좋아요 버튼"
          onClick={clickLikeButton}
        />
        <Image
          src={`/icons/bookmark${isBookmark ? "Hover" : ""}.svg`}
          width={24}
          height={24}
          alt="북마크 버튼"
          onClick={clickBookmarkButton}
        />
      </ButtonWrapper>
      {author === currentUserId && (
        <ButtonWrapper>
          <Image
            src={`/icons/more${showMore ? "-on" : ""}.svg`}
            onClick={showMoreModal}
            width={24}
            height={24}
            alt="더보기 버튼"
          />
        </ButtonWrapper>
      )}
      {showMore && <ShowMoreModal closeModal={() => setShowMore(false)} />}
      <CloseButton onClick={() => router.push("/")}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.10298 0.79705C9.0413 0.735248 8.96805 0.686216 8.8874 0.652762C8.80675 0.619307 8.72029 0.602087 8.63298 0.602087C8.54567 0.602087 8.45921 0.619307 8.37856 0.652762C8.29792 0.686216 8.22466 0.735248 8.16298 0.79705L4.90298 4.05038L1.64298 0.790383C1.58126 0.728662 1.50799 0.679702 1.42734 0.646299C1.3467 0.612895 1.26027 0.595703 1.17298 0.595703C1.08569 0.595703 0.999262 0.612895 0.918619 0.646299C0.837976 0.679702 0.764702 0.728662 0.702981 0.790383C0.64126 0.852105 0.5923 0.925378 0.558896 1.00602C0.525493 1.08666 0.508301 1.1731 0.508301 1.26038C0.508301 1.34767 0.525493 1.4341 0.558896 1.51475C0.5923 1.59539 0.64126 1.66866 0.702981 1.73038L3.96298 4.99038L0.702981 8.25038C0.64126 8.3121 0.5923 8.38538 0.558896 8.46602C0.525493 8.54666 0.508301 8.6331 0.508301 8.72038C0.508301 8.80767 0.525493 8.8941 0.558896 8.97475C0.5923 9.05539 0.64126 9.12866 0.702981 9.19038C0.764702 9.2521 0.837976 9.30106 0.918619 9.33447C0.999262 9.36787 1.08569 9.38506 1.17298 9.38506C1.26027 9.38506 1.3467 9.36787 1.42734 9.33447C1.50799 9.30106 1.58126 9.2521 1.64298 9.19038L4.90298 5.93038L8.16298 9.19038C8.2247 9.2521 8.29798 9.30106 8.37862 9.33447C8.45926 9.36787 8.54569 9.38506 8.63298 9.38506C8.72027 9.38506 8.8067 9.36787 8.88734 9.33447C8.96799 9.30106 9.04126 9.2521 9.10298 9.19038C9.1647 9.12866 9.21366 9.05539 9.24707 8.97475C9.28047 8.8941 9.29766 8.80767 9.29766 8.72038C9.29766 8.6331 9.28047 8.54666 9.24707 8.46602C9.21366 8.38538 9.1647 8.3121 9.10298 8.25038L5.84298 4.99038L9.10298 1.73038C9.35631 1.47705 9.35631 1.05038 9.10298 0.79705Z"
            fill="white"
          />
        </svg>
      </CloseButton>{" "}
    </DetailHeaderContainer>
  );
};

const DetailHeaderContainer = styled.div`
  padding: 1rem 2rem 1rem 3.5rem;
  width: 100%;
  position: relative;
  align-items: center;
  justify-content: space-between;
  display: flex;
  img {
    cursor: pointer;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.2rem;
`;

const CloseButton = styled.div`
  cursor: pointer;
  padding: 0.125rem;

  path {
    fill: ${({ theme }) => theme.colors.gray3};
  }

  &:hover {
    path {
      fill: ${({ theme }) => theme.colors.primary6};
    }
  }
`;

export default DetailHeader;

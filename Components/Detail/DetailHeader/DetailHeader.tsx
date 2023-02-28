import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import {
  addBookmark,
  addLike,
  decrementBookmark,
  decrementLike,
  deleteBookmark,
  deleteLike,
  incrementBookmark,
  incrementLike,
} from "@/utils/APIs/supabase";
import ShowMoreModal from "./ShowMoreModal";

interface DetailHeaderProps {
  author: string;
  isBookmark: boolean;
  isLike: boolean;
  setIsBookmark: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLike: React.Dispatch<React.SetStateAction<boolean>>;
  currentUserId: string;
}

const DetailHeader = ({
  author,
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

  const showMoreModal = () => setShowMore((prev) => !prev);

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
      setIsLike(false);
    },
  });

  const clickBookmarkButton = async () => {
    if (!currentUserId) {
      return router.push("/auth/login");
    }
    if (isBookmark) {
      deleteBookmarkMutate({ postId: postId as string, currentUserId });
      // 구현 후 주석 해제
      // await decrementBookmark(postId as string);
    } else {
      addBookmarkMutate({ postId: postId as string, currentUserId });
      // 구현 후 주석 해제
      // await incrementBookmark(postId as string);
    }
    return queryClient.invalidateQueries(["GET_POSTS"]);
  };

  const clickLikeButton = async () => {
    if (!currentUserId) {
      return router.push("/auth/login");
    }
    if (isLike) {
      deleteLikeMutate({ postId: postId as string, currentUserId });
      await decrementLike(postId as string);
    } else {
      addLikeMutate({ postId: postId as string, currentUserId });
      await incrementLike(postId as string);
    }
    return queryClient.invalidateQueries(["GET_POSTS"]);
  };

  return (
    <DetailHeaderContainer>
      <DetailHeaderWrapper>
        {isLike ? (
          <Image
            src="/icons/likeHover.svg"
            width={36}
            height={36}
            alt="좋아요 버튼"
            onClick={clickLikeButton}
          />
        ) : (
          <Image
            src="/icons/like.svg"
            width={36}
            height={36}
            alt="좋아요 버튼"
            onClick={clickLikeButton}
          />
        )}
        {/* <Image
          src={`/icons/like${isLike ? "Hover" : ""}.svg`}
          width={36}
          height={36}
          alt="좋아요 버튼"
          onClick={clickLikeButton}
        /> */}
        <Image
          src={`/icons/bookmark${isBookmark ? "Hover" : ""}.svg`}
          width={36}
          height={36}
          alt="북마크 버튼"
          onClick={clickBookmarkButton}
        />
        {author === currentUserId && (
          <Image
            src="/icons/more.svg"
            onClick={showMoreModal}
            width={36}
            height={36}
            alt="더보기 버튼"
          />
        )}
      </DetailHeaderWrapper>
      {showMore && <ShowMoreModal />}
    </DetailHeaderContainer>
  );
};

const DetailHeaderContainer = styled.div`
  width: 100%;
  position: relative;
  img {
    cursor: pointer;
  }
`;

const DetailHeaderWrapper = styled.div`
  height: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
  padding-right: 2.5rem;
  gap: 1.875rem;
`;

export default DetailHeader;

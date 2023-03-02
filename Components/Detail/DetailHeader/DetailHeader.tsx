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
      await decrementBookmark(postId as string);
    } else {
      addBookmarkMutate({ postId: postId as string, currentUserId });
      await incrementBookmark(postId as string);
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

export default DetailHeader;

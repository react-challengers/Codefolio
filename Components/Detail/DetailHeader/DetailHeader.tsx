import supabase from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import ShowMoreModal from "./ShowMoreModal";

interface DetailHeaderProps {
  isOwner: boolean;
  isBookmark: boolean;
  isLike: boolean;
  setIsBookmark: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLike: React.Dispatch<React.SetStateAction<boolean>>;
  currentUserId: string;
}

const DetailHeader = ({
  isOwner,
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

  const isAnonymous = () => {
    if (!currentUserId) {
      router.push("/auth/login");
    }
  };

  const addBookmark = async () => {
    const { error } = await supabase
      .from("bookmark")
      .insert({ post_id: postId, user_id: currentUserId });
    if (!error) {
      setIsBookmark(true);
      queryClient.invalidateQueries(["GET_POSTS"]);
    }
  };

  const deleteBookmark = async () => {
    const { error } = await supabase
      .from("bookmark")
      .delete()
      .eq("user_id", currentUserId)
      .eq("post_id", postId);
    if (!error) {
      setIsBookmark(false);
      queryClient.invalidateQueries(["GET_POSTS"]);
    }
  };

  const addLike = async () => {
    const { error } = await supabase
      .from("like")
      .insert({ post_id: postId, user_id: currentUserId });
    if (!error) {
      await supabase.rpc("increment_like", { row_id: postId });
      setIsLike(true);
      queryClient.invalidateQueries(["GET_POSTS"]);
    }
  };

  const deleteLike = async () => {
    const { error } = await supabase
      .from("like")
      .delete()
      .eq("user_id", currentUserId)
      .eq("post_id", postId);
    if (!error) {
      await supabase.rpc("decrement_like", { row_id: postId });
      setIsLike(false);
      queryClient.invalidateQueries(["GET_POSTS"]);
    }
  };

  const clickBookmarkButton = async () => {
    isAnonymous();
    if (isBookmark) {
      deleteBookmark();
    } else {
      addBookmark();
    }
  };

  const clickLikeButton = async () => {
    isAnonymous();
    if (isLike) {
      deleteLike();
    } else {
      addLike();
    }
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
        {isOwner && (
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

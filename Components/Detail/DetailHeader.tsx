import supabase from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ShowMoreModal from "./ShowMoreModal";

const DetailHeader = () => {
  const {
    query: { id: postId }, // c078f3bf-4e86-44a2-a672-583f36c1aa8f
  } = useRouter();
  const [showMore, setShowMore] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isBookmark, setIsBookmark] = useState(false);

  const showMoreModal = () => setShowMore((prev) => !prev);

  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  };

  const getBookmark = async () => {
    const { data } = await supabase
      .from("bookmark")
      .select()
      .eq("user_id", user?.id)
      .eq("post_id", postId)
      .single();
    setIsBookmark(!!data?.data);
  };

  const addBookmark = async () => {
    const { error } = await supabase
      .from("bookmark")
      .insert({ post_id: postId, user_id: user?.id });
    if (!error) {
      setIsBookmark(true);
    }
  };

  const deleteBookmark = async () => {
    const { error } = await supabase
      .from("bookmark")
      .delete()
      .eq("user_id", user?.id)
      .eq("post_id", postId);
    if (!error) {
      setIsBookmark(false);
    }
  };

  useEffect(() => {
    getUser();
    getBookmark();
  }, []);

  const clickBookmarkButton = async () => {
    if (isBookmark) {
      deleteBookmark();
    } else {
      addBookmark();
    }
  };

  return (
    <DetailHeaderContainer>
      <DetailHeaderWrapper>
        <Image src="/icons/like.svg" width={36} height={36} alt="좋아요 버튼" />
        <BookmarkButton
          src="/icons/bookmark.svg"
          width={36}
          height={36}
          alt="북마크 버튼"
          onClick={clickBookmarkButton}
          isBookmark={isBookmark}
        />
        <Image
          src="/icons/more.svg"
          onClick={showMoreModal}
          width={36}
          height={36}
          alt="더보기 버튼"
        />
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

const BookmarkButton = styled(Image)<{ isBookmark: boolean }>`
  background-color: ${({ isBookmark }) =>
    isBookmark ? "yellow" : "transparent"};
  &:hover {
    background-color: yellow;
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

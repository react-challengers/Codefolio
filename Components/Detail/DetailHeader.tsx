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
  const [isLike, setIsLike] = useState(false);

  const showMoreModal = () => setShowMore((prev) => !prev);

  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  };

  const getLike = async () => {
    const { data } = await supabase
      .from("like")
      .select()
      .eq("user_id", user?.id)
      .eq("post_id", postId)
      .single();
    setIsLike(!!data?.data);
  };

  const addLike = async () => {
    const { error } = await supabase
      .from("like")
      .insert({ post_id: postId, user_id: user?.id });
    console.log(error);
    if (!error) {
      setIsLike(true);
    }
  };

  const deleteLike = async () => {
    const { error } = await supabase
      .from("like")
      .delete()
      .eq("user_id", user?.id)
      .eq("post_id", postId);
    console.log(error);
    if (!error) {
      setIsLike(false);
    }
  };

  useEffect(() => {
    getUser();
    getLike();
  }, []);

  const clickLikeButton = async () => {
    if (isLike) {
      deleteLike();
    } else {
      addLike();
    }
  };

  return (
    <DetailHeaderContainer>
      <DetailHeaderWrapper>
        <LikeButton
          src="/icons/like.svg"
          width={36}
          height={36}
          alt="좋아요 버튼"
          onClick={clickLikeButton}
          isLike={isLike}
        />
        <Image
          src="/icons/bookmark.svg"
          width={36}
          height={36}
          alt="북마크 버튼"
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

const DetailHeaderWrapper = styled.div`
  height: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
  padding-right: 2.5rem;
  gap: 1.875rem;
`;

const LikeButton = styled(Image)<{ isLike: boolean }>`
  background-color: ${({ isLike }) => (isLike ? "pink" : "transparent")};
  &:hover {
    background-color: pink;
  }
`;

export default DetailHeader;

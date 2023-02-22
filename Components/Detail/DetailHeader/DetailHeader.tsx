import supabase from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ShowMoreModal from "./ShowMoreModal";

const DetailHeader = () => {
  const router = useRouter();
  const {
    query: { id: postId }, // c078f3bf-4e86-44a2-a672-583f36c1aa8f
  } = useRouter();
  const [showMore, setShowMore] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isBookmark, setIsBookmark] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const showMoreModal = () => setShowMore((prev) => !prev);

  const isAnonymous = () => {
    if (!user) {
      router.push("/auth/login");
    }
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

  const addLike = async () => {
    const { error } = await supabase
      .from("like")
      .insert({ post_id: postId, user_id: user?.id });
    if (!error) {
      await supabase.rpc("increment_like", { row_id: postId });
      setIsLike(true);
    }
  };

  const deleteLike = async () => {
    const { error } = await supabase
      .from("like")
      .delete()
      .eq("user_id", user?.id)
      .eq("post_id", postId);
    if (!error) {
      await supabase.rpc("decrement_like", { row_id: postId });
      setIsLike(false);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    const getBookmark = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("bookmark")
        .select()
        .eq("user_id", user?.id)
        .eq("post_id", postId)
        .single();
      setIsBookmark(!!data?.data);
    };

    const getLike = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("like")
        .select()
        .eq("user_id", user?.id)
        .eq("post_id", postId)
        .single();
      setIsLike(!!data?.data);
    };

    getUser();
    getBookmark();
    getLike();
  }, []);

  const checkBookmark = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("bookmark")
      .select()
      .eq("user_id", user?.id)
      .eq("post_id", postId)
      .single();
    setIsBookmark(!!data);
  };

  const checkLike = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("like")
      .select()
      .eq("user_id", user?.id)
      .eq("post_id", postId)
      .single();

    setIsLike(!!data);
  };

  useEffect(() => {
    const checkPostOwner = (postData: any) => {
      if (postData?.user_id === user?.id) {
        setIsOwner(true);
      }
    };

    const fetchPostData = async () => {
      if (!router.query?.id) return;
      const { data, error } = await supabase
        .from("post")
        .select("user_id")
        .eq("id", postId)
        .single();

      if (error) {
        return;
      }
      checkPostOwner(data);
    };

    fetchPostData();
    checkBookmark();
    checkLike();
  }, [router.query?.id, user?.id]);

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
        <Image
          src={`/icons/like${isLike ? "Hover" : ""}.svg`}
          width={36}
          height={36}
          alt="좋아요 버튼"
          onClick={clickLikeButton}
        />
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

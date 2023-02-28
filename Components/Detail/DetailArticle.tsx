import {
  Comment,
  DetailHeader,
  DetailSide,
  DetailTitle,
  RelatedProject,
} from "@/Components/Detail";
import supabase from "@/lib/supabase";
import getTextColorByBackgroundColor from "@/utils/detail/getTextColorByBackgroundColor";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import styled from "styled-components";
import DetailContent from "./DetailContent";

const DetailArticle = () => {
  const {
    query: { id: postId },
  } = useRouter();
  const queryClient = useQueryClient();

  const [titleData, setTitleData] = useState({
    title: "",
    subtitle: "",
    backgroundColor: "",
    field: "",
    subCategory: "",
  });

  const [sideData, setSideData] = useState({
    progressDate: ["", ""],
    subCategory: "",
    skills: ["Front-end", "Android"],
    tag: [""],
    members: [""],
  });

  const [content, setContent] = useState("");
  const [titleColor, setTitleColor] = useState("black");
  const [author, setAuthor] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const [isBookmark, setIsBookmark] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isHeaderReady, setIsHeaderReady] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [authorProfileImage, setAuthorProfileImage] = useState("");

  const getAuthor = async () => {
    const { data, error } = await supabase
      .from("user_profile")
      .select()
      .eq("user_id", author)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    setAuthorName(data?.user_name);
    setAuthorProfileImage(data?.profile_image);
  };

  const getCurrentUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      return;
    }
    setCurrentUserId(data?.user.id);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (!postId) return;

    const currentPost = queryClient
      .getQueryData<PostType[]>(["GET_POSTS"])
      ?.find((post) => post.id === postId);

    if (currentPost) {
      const {
        title,
        sub_title: subTitle,
        title_background_color: backgroundColor,
        large_category: field,
        sub_category: subCategory,
        content: postContent,
        progress_date: progressDate,
        tag,
        skills,
        members,
        user_id: userId,
      } = currentPost;

      setTitleData({
        title,
        subtitle: subTitle,
        backgroundColor,
        field,
        subCategory,
      });

      setSideData({
        progressDate,
        tag,
        skills,
        members,
        subCategory,
      });

      setAuthor(userId);

      setContent(postContent);
    }
  }, [postId]);

  useEffect(() => {
    const luma = getTextColorByBackgroundColor(titleData.backgroundColor);
    if (luma < 127.5) setTitleColor("white");
    else setTitleColor("black");
  }, [titleData.backgroundColor]);

  useEffect(() => {
    if (!author) return;
    getAuthor();
  }, [author]);

  // -----------

  useEffect(() => {
    if (!currentUserId) return setIsHeaderReady(true);

    const getBookmark = async () => {
      const { data, error } = await supabase
        .from("bookmark")
        .select()
        .eq("user_id", currentUserId)
        .eq("post_id", postId)
        .single();

      if (error) {
        return;
      }

      setIsBookmark(!!data);
    };

    const getLike = async () => {
      const { data, error } = await supabase
        .from("like")
        .select()
        .eq("user_id", currentUserId)
        .eq("post_id", postId)
        .single();

      if (error) {
        return;
      }

      setIsLike(!!data);
    };

    setIsOwner(author === currentUserId);
    getBookmark();
    getLike();
    return setIsHeaderReady(true);
  }, [currentUserId]);

  if (
    !postId ||
    !titleData ||
    !sideData ||
    !content ||
    !titleColor ||
    !author ||
    !authorName ||
    !authorProfileImage ||
    !isHeaderReady
  )
    return <Loader color="#fff" size={20} speedMultiplier={2} />;

  return (
    <DetailPageContainer>
      <DetailHeader
        isBookmark={isBookmark}
        isLike={isLike}
        isOwner={isOwner}
        setIsBookmark={setIsBookmark}
        setIsLike={setIsLike}
        currentUserId={currentUserId}
      />
      <DetailTitle {...titleData} titleColor={titleColor} />
      <DetailContentsContainer>
        <DetailContentsSide>
          <DetailSide
            {...sideData}
            authorName={authorName}
            authorProfileImage={authorProfileImage}
          />
        </DetailContentsSide>
        <DetailContentsMain>
          {content && <DetailContent content={content} />}
        </DetailContentsMain>
      </DetailContentsContainer>
      <RelatedProject />
      <Comment />
    </DetailPageContainer>
  );
};

const DetailPageContainer = styled.div`
  width: 87.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  background-color: white;
  border-radius: 0.5rem;
  padding-bottom: 3.125rem;

  z-index: 1;
`;

const DetailContentsContainer = styled.div`
  width: 100%;
  padding: 0 7.5rem;
  margin-top: 2.5rem;
  display: flex;
`;

const DetailContentsMain = styled.main`
  width: 100%;
  min-height: 50rem;
  margin-left: 1.25rem;
`;

const DetailContentsSide = styled.aside``;

const Loader = styled(ClimbingBoxLoader)`
  position: fixed !important;
  top: 50%;
  left: 50%;
`;

export default DetailArticle;

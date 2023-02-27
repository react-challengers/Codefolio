import {
  Comment,
  DetailHeader,
  DetailSide,
  DetailTitle,
  RelatedProject,
} from "@/Components/Detail";
import {
  getAllPosts,
  getAuthor,
  getCurrentUser,
  getIsBookMark,
  getIsLike,
  getOnePost,
} from "@/utils/APIs/supabase";
import getTextColorByBackgroundColor from "@/utils/detail/getTextColorByBackgroundColor";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import styled from "styled-components";

const Viewer = dynamic(() => import("@/Components/Detail/DetailContent"), {
  ssr: false,
});

const DetailArticle = () => {
  const {
    query: { id: postId },
  } = useRouter();

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
  const [author, setAuthor] = useState("");
  const [titleColor, setTitleColor] = useState("black");
  const [currentUserId, setCurrentUserId] = useState("");
  const [isBookmark, setIsBookmark] = useState(false);
  const [isLike, setIsLike] = useState(false);

  const { data: allPostsData, isLoading } = useQuery<PostType[]>(
    ["GET_POSTS"],
    {
      queryFn: getAllPosts,
      enabled: !!postId,
      onSuccess(data) {
        if (data) {
          const currentPost = data.find((post) => post.id === postId);
          if (currentPost) {
            setTitleData({
              title: currentPost.title,
              subtitle: currentPost.sub_title,
              backgroundColor: currentPost.title_background_color,
              field: currentPost.large_category,
              subCategory: currentPost.sub_category,
            });
            setSideData({
              progressDate: currentPost.progress_date,
              subCategory: currentPost.sub_category,
              skills: currentPost.skills,
              tag: currentPost.tag,
              members: currentPost.members,
            });
            setContent(currentPost.content);
            setAuthor(currentPost.user_id);
          }
        }
      },
    }
  );

  // const { isLoading } = useQuery<PostType>(["getOnePost", postId], {
  //   queryFn: ({ queryKey }) => getOnePost(queryKey[1] as string),
  //   onSuccess(data) {
  //     if (data) {
  //       setTitleData({
  //         title: data.title,
  //         subtitle: data.sub_title,
  //         backgroundColor: data.title_background_color,
  //         field: data.large_category,
  //         subCategory: data.sub_category,
  //       });
  //       setSideData({
  //         progressDate: data.progress_date,
  //         subCategory: data.sub_category,
  //         skills: data.skills,
  //         tag: data.tag,
  //         members: data.members,
  //       });
  //       setContent(data.content);
  //       setAuthor(data.user_id);
  //     }
  //   },
  //   onError(error) {
  //     console.log(error);
  //   },
  //   enabled: !!postId,
  // });

  // TODO: 추후 user_name과 profile_image를 가져오는 API를 만들어서 수정해야함
  const { data: authorInfo, isLoading: isAuthorLoading } = useQuery(
    ["getAuthor", author],
    {
      queryFn: ({ queryKey }) => getAuthor(queryKey[1] as string),
      onError(error) {
        console.log(error);
      },
      enabled: !!author,
    }
  );

  const { isLoading: currentUserLoading } = useQuery(["currentUser"], {
    queryFn: getCurrentUser,
    onSuccess({ data: { user } }) {
      if (user) {
        setCurrentUserId(user.id);
      }
    },
  });

  // 이미지로 변경 후 삭제
  useEffect(() => {
    const luma = getTextColorByBackgroundColor(titleData.backgroundColor);
    if (luma < 127.5) setTitleColor("white");
    else setTitleColor("black");
  }, [titleData.backgroundColor]);

  // -----------

  const { isLoading: isBookmarkLoading } = useQuery(
    ["getBookmark", currentUserId, postId],
    {
      queryFn: ({ queryKey }) =>
        getIsBookMark(queryKey as [string, string, string]),
      onSuccess(data) {
        if (data) {
          setIsBookmark(!!data);
        }
      },
      onError(error) {
        console.log(error);
      },
      enabled: !!currentUserId && !!postId,
    }
  );

  const { isLoading: isLikeLoading } = useQuery(
    ["getLike", currentUserId, postId],
    {
      queryFn: ({ queryKey }) =>
        getIsLike(queryKey as [string, string, string]),
      onSuccess(data) {
        if (data) {
          setIsLike(!!data);
        }
      },
      onError(error) {
        console.log(error);
      },
      enabled: !!currentUserId && !!postId,
    }
  );

  if (
    isLoading ||
    isAuthorLoading ||
    currentUserLoading ||
    isBookmarkLoading ||
    isLikeLoading
  )
    return <Loader color="#fff" size={20} speedMultiplier={2} />;

  return (
    <DetailPageContainer>
      <DetailHeader
        isBookmark={isBookmark}
        isLike={isLike}
        author={author}
        setIsBookmark={setIsBookmark}
        setIsLike={setIsLike}
        currentUserId={currentUserId}
      />
      <DetailTitle {...titleData} titleColor={titleColor} />
      <DetailContentsContainer>
        <DetailContentsSide>
          <DetailSide {...sideData} authorInfo={authorInfo} />
        </DetailContentsSide>
        <DetailContentsMain>
          {content && <Viewer content={content} />}
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

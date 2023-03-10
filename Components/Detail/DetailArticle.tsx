import {
  Comment,
  DetailHeader,
  DetailSide,
  DetailTitle,
  RelatedProject,
} from "@/Components/Detail";
import {
  getSingleUser,
  getCurrentUser,
  getIsBookMark,
  getIsLike,
  getOnePost,
} from "@/utils/APIs/supabase";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { SyncLoader } from "react-spinners";
import styled from "styled-components";
import TopButton from "../Common/TopButton";
import DetailBadgesContainer from "./DetailBadgesContainer";
import DetailContent from "./DetailContent";

const DetailArticle = ({ detailRef }: any) => {
  const {
    query: { id: postId },
  } = useRouter();

  const [titleData, setTitleData] = useState({
    title: "",
    subtitle: "",
    backgroundImage: "",
    field: "",
    subCategory: "",
  });
  const [sideData, setSideData] = useState({
    progressDate: ["", ""],
    subCategory: "",
    skills: ["Front-end", "Android"],
    tag: [""],
    members: [""],
    githubUrl: "",
    deployUrl: "",
  });
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const [isBookmark, setIsBookmark] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [category, setCategory] = useState("");

  const { isLoading } = useQuery<PostType>(
    ["getOnePost", postId],
    () => getOnePost(postId as string),
    {
      // queryFn: ({ queryKey }) => getOnePost(queryKey[1] as string),
      onSuccess(data) {
        if (data) {
          setTitleData({
            title: data.title,
            subtitle: data.sub_title,
            backgroundImage: data.title_background_image,
            field: data.large_category,
            subCategory: data.sub_category,
          });
          setSideData({
            progressDate: data.progress_date,
            subCategory: data.sub_category,
            skills: data.skills,
            tag: data.tag,
            members: data.members,
            githubUrl: data.github_url,
            deployUrl: data.deployed_url,
          });
          setContent(data.content);
          setAuthor(data.user_id);
          setCategory(data.sub_category);
        }
      },
      onError(error) {
        console.log(error);
      },
      enabled: !!postId,
    }
  );

  const { data: authorInfo, isLoading: isAuthorLoading } = useQuery(
    ["getSingleUser", author],
    {
      queryFn: ({ queryKey }) => getSingleUser(queryKey[1] as string),
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
    onError(error) {
      setCurrentUserId("");
    },
  });

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
        setIsBookmark(false);
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
        setIsLike(false);
      },
      enabled: !!currentUserId && !!postId,
    }
  );

  if (isLoading || isAuthorLoading || currentUserLoading)
    return <Loader color="#3DDFE9" size={16} speedMultiplier={1} margin={4} />;

  return (
    <DetailPageContainer>
      <DetailHeader
        isBookmark={isBookmark}
        isLike={isLike}
        setIsBookmark={setIsBookmark}
        setIsLike={setIsLike}
        currentUserId={currentUserId}
      />
      <DetailTitle {...titleData} />
      <DetailContentsContainer>
        <DetailContentsSide>
          <DetailSide {...sideData} authorInfo={authorInfo} />
        </DetailContentsSide>
        <DetailContentsMain>
          {content && <DetailContent content={content} />}
        </DetailContentsMain>
      </DetailContentsContainer>
      <DetailBadgesContainer />
      <RelatedProject category={category} />
      <Comment />
      <TopButton
        right="calc(50% - 40rem)"
        bottom="0.75rem"
        elementRef={detailRef}
      />
    </DetailPageContainer>
  );
};

const DetailPageContainer = styled.div`
  width: 87.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.gray11};
  border-radius: 0.5rem;
  padding-bottom: 5.5rem;

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

const Loader = styled(SyncLoader)`
  position: fixed !important;
  top: 50%;
  left: 50%;
`;

export default DetailArticle;

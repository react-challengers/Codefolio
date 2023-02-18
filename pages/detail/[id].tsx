import dynamic from "next/dynamic";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMemo } from "react";
import styled from "styled-components";
import {
  Comment,
  DetailHeader,
  DetailSide,
  DetailTitle,
  RelatedProject,
} from "@/Components/Detail";
import { useQueryClient } from "@tanstack/react-query";

const Viewer = dynamic(() => import("@/Components/Detail/DetailContent"), {
  ssr: false,
});

const DetailPage: NextPage = () => {
  const {
    query: { id: postId },
  } = useRouter();

  const queryClient = useQueryClient();

  const postById = useMemo(() => {
    return queryClient
      .getQueryData<PostType[]>(["GET_POSTS"])
      ?.find((post) => post.id === postId);
  }, [postId, queryClient]);

  const titleData = useMemo(() => {
    if (!postById)
      return {
        title: "",
        subtitle: "",
        backgroundColor: "",
        field: "",
        subCategory: "",
      };
    return {
      title: postById.title,
      subtitle: postById.sub_title,
      backgroundColor: postById.title_background_color,
      field: postById.large_category,
      subCategory: postById.sub_category,
    };
  }, [postById]);

  const sideData = useMemo(() => {
    if (!postById)
      return {
        progressDate: [],
        tag: [],
        skills: [],
        members: [],
        userId: "",
      };
    return {
      progressDate: postById.progress_date,
      tag: postById.tag,
      skills: postById.skills,
      members: postById.members,
      userId: postById.user_id,
    };
  }, [postById]);

  const content = useMemo(() => {
    if (!postById) return "";
    return postById.content;
  }, [postById]);

  return (
    <DetailPageContainer>
      <DetailHeader />
      <DetailTitle {...titleData} />
      <DetailContentsContainer>
        <DetailContentsSide>
          <DetailSide {...sideData} />
        </DetailContentsSide>
        <DetailContentsMain>
          <Viewer content={content} />
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

export default DetailPage;

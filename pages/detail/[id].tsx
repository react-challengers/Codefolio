import dynamic from "next/dynamic";
import supabase from "@/lib/supabase";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Comment,
  DetailHeader,
  DetailSide,
  DetailTitle,
  RelatedProject,
} from "@/Components/Detail";

const Viewer = dynamic(() => import("@/Components/Detail/DetailContent"), {
  ssr: false,
});

const DetailPage: NextPage = () => {
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
    stack: [""],
    skills: ["Front-end", "Android"],
    tag: [""],
    members: [""],
    userId: "",
  });
  const [content, setContent] = useState("");

  const getData = async () => {
    const { data, error } = await supabase
      .from("post")
      .select()
      .eq("id", postId)
      .single();

    if (error) {
      return;
    }

    const {
      title,
      sub_title: subTitle,
      title_background_color: backgroundColor,
      large_category: field,
      sub_category: subCategory,
      content: postContent,
      progress_date: progressDate,
      stack,
      tag,
      skills,
      members,
      user_id: userId,
    } = data;

    setTitleData({
      title,
      subtitle: subTitle,
      backgroundColor,
      field,
      subCategory,
    });

    setSideData({
      progressDate,
      stack,
      tag,
      skills,
      members,
      userId,
    });

    setContent(postContent);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <DetailPageContainer>
      <DetailHeader />
      <DetailTitle {...titleData} />
      <DetailContentsContainer>
        <DetailContentsSide>
          <DetailSide {...sideData} />
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

export default DetailPage;

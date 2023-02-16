import { NextPage } from "next";
import styled from "styled-components";
import DefaultButton from "@/Components/Common/DefaultButton";
import PostTitle from "@/Components/Post/PostTitle";
import ProjectInfo from "@/Components/Post/ProjectInfo";
import { useRecoilValue } from "recoil";
import {
  postContent,
  postLargeCategory as recoilPostLargeCategory,
  postMembers,
  postProjectDuration,
  postPublic,
  postSkills,
  postSubCategory as recoilPostSubCategory,
  postSubTitle,
  postTags,
  postTitle,
  postTitleBackgroundColor,
} from "@/lib/recoil";
import supabase from "@/lib/supabase";
import { useState } from "react";
import { useRouter } from "next/router";

/**
 * @TODO custom hook으로 리팩토링하기
 * @TODO 카테고리 중복 선택 , 보여주는 UI
 */
const Post: NextPage = () => {
  const title = useRecoilValue(postTitle);
  const subTitle = useRecoilValue(postSubTitle);
  const titleBackgroundColor = useRecoilValue(postTitleBackgroundColor);
  const [startDate, endDate] = useRecoilValue(postProjectDuration);
  const skills = useRecoilValue(postSkills);
  const tag = useRecoilValue(postTags);
  const isPublic = useRecoilValue(postPublic);
  const members = useRecoilValue(postMembers);
  const content = useRecoilValue(postContent);
  const postLargeCategory = useRecoilValue(recoilPostLargeCategory);
  const postSubCategory = useRecoilValue(recoilPostSubCategory);

  const router = useRouter();

  const newPostRow = {
    title,
    sub_title: subTitle,
    title_background_color: titleBackgroundColor,
    large_category: postLargeCategory,
    sub_category: postSubCategory,
    skills,
    progress_date: [startDate, endDate],
    members,
    tag,
    is_public: isPublic,
    content,
  };

  const [isSaved, setIsSaved] = useState(false);

  const onSave = () => {
    // 저장 버튼
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  const onPost = async () => {
    // 게시 버튼
    const { data, error } = await supabase
      .from("post")
      .insert(newPostRow)
      .select()
      .single();
    if (!error) {
      router.push({
        pathname: "/",
        query: { id: data.id },
      });
    }
  };

  return (
    <MainWrapper>
      <PostHeader>
        <SaveAlert isSaved={isSaved}>글이 저장 되었습니다.</SaveAlert>
        <DefaultButton text="저장" type="outline" size="s" onClick={onSave} />
        <DefaultButton text="게시" type="full" size="s" onClick={onPost} />
      </PostHeader>
      <section>
        <PostTitle />
        <ProjectInfo />
      </section>
    </MainWrapper>
  );
};

const MainWrapper = styled.main`
  max-width: 98.75rem;
  margin: 0 auto;
`;

const PostHeader = styled.section`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 2.8125rem 0;
  gap: 1.25rem;
`;

interface SaveAlertProps {
  isSaved: boolean;
}

const SaveAlert = styled.span<SaveAlertProps>`
  opacity: ${({ isSaved }) => (isSaved ? 1 : 0)};
  transition: all 0.5s ease-in-out;
`;

export default Post;

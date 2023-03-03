import { NextPage } from "next";
import styled from "styled-components";
import { Modal } from "@/Components/Common";
import getYYYYMM from "@/utils/commons/getYYYYMM";

import { useRecoilState } from "recoil";
import {
  postContent,
  postLargeCategory as recoilPostLargeCategory,
  postMembers,
  postProjectDuration,
  postGithubUrl,
  postDeployedUrl,
  postSkills,
  postSubCategory as recoilPostSubCategory,
  postSubTitle,
  postTags,
  postTitle,
  postTitleBackgroundColor,
  postId,
} from "@/lib/recoil";
import supabase from "@/lib/supabase";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PostTitle from "./PostTitle";
import ProjectInfo from "./ProjectInfo";
import PostErrorMassage from "./PostErrorMassage";

/**
 * @TODO custom hook으로 리팩토링하기
 * @TODO 카테고리 중복 선택 , 보여주는 UI
 * @TODO user_id 리코일로 관리
 * @TODO 유효성 검사 리펙토링
 */
const Post: NextPage = () => {
  const [isPostId] = useRecoilState(postId);
  const [title, setTitle] = useRecoilState(postTitle);
  const [subTitle, setSubTitle] = useRecoilState(postSubTitle);
  const [titleBackgroundColor, setTitleBackgroundColor] = useRecoilState(
    postTitleBackgroundColor
  );
  const [[startDate, endDate], setProjectDuration] =
    useRecoilState(postProjectDuration);
  const [skills, setSkills] = useRecoilState(postSkills);
  const [tag, setTag] = useRecoilState(postTags);
  const [githubUrl, setGithubUrl] = useRecoilState(postGithubUrl);
  const [deployedUrl, setDeployedUrl] = useRecoilState(postDeployedUrl);
  const [members, setMembers] = useRecoilState(postMembers);
  const [content, setContent] = useRecoilState(postContent);
  const [postLargeCategory, setPostLargeCategory] = useRecoilState(
    recoilPostLargeCategory
  );
  const [postSubCategory, setPostSubCategory] = useRecoilState(
    recoilPostSubCategory
  );
  const [userId, setUserId] = useState<string | null>(null);

  const [isError, setIsError] = useState(false);
  const [errorMassage, setErrorMassage] = useState("에러");

  const router = useRouter();

  const newPostRow = {
    id: isPostId,
    title,
    sub_title: subTitle,
    title_background_color: titleBackgroundColor,
    large_category: postLargeCategory,
    sub_category: postSubCategory,
    skills,
    progress_date: [startDate, endDate],
    members,
    tag,
    github_url: githubUrl,
    deployed_url: deployedUrl,
    content,
    user_id: userId,
  };

  useEffect(() => {
    const LoginState = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setUserId(data.session?.user.id);
      }
    };

    LoginState();
  }, []);

  // const [isSaved, setIsSaved] = useState(false);

  // const onSave = () => {
  //   // 저장 버튼
  //   setIsSaved(true);
  //   setTimeout(() => {
  //     setIsSaved(false);
  //   }, 2000);
  // };

  const validatePost = () => {
    // 유효성 검사
    if (!title) {
      return false;
    }
    if (!subTitle) {
      return false;
    }
    if (!postSubCategory) {
      return false;
    }
    if (skills.length === 0) {
      return false;
    }
    if (skills.length !== new Set(skills).size) {
      return false;
    }
    if (skills.some((skill) => skill === "")) {
      return false;
    }
    if (tag.length !== new Set(tag).size) {
      return false;
    }
    if (tag.some((item) => item === "")) {
      return false;
    }
    if (tag.length === 0) {
      return false;
    }
    if (!content) {
      return false;
    }
    if (
      members
        .map((member) => Object.values(member))
        .some((item) => item.some((value) => value === ""))
    ) {
      return false;
    }
    return true;
  };

  const resetInput = () => {
    setTitle("");
    setSubTitle("");
    setTitleBackgroundColor("");
    setProjectDuration([getYYYYMM(), getYYYYMM()]);
    setSkills([]);
    setTag([]);
    setGithubUrl("");
    setDeployedUrl("");
    setMembers([]);
    setContent("");
    setPostLargeCategory("");
    setPostSubCategory("");
  };

  const onPost = async () => {
    // 게시 버튼
    // 유효성 검사
    if (!validatePost()) return;
    // 게시
    if (router.asPath === "/create-post") {
      const { data, error } = await supabase
        .from("post")
        .insert(newPostRow)
        .select()
        .single();
      if (!error) {
        resetInput();
        router.push({
          pathname: "/",
          query: { id: data.id },
        });
      }
    } else {
      const { error } = await supabase
        .from("post")
        .update(newPostRow)
        .eq("id", router.query.id);
      if (!error) {
        resetInput();
        router.push({
          pathname: "/",
          query: { id: router.query.id },
        });
      }
    }
  };

  useEffect(() => {
    return () => {
      resetInput();
    };
  }, []);

  return (
    <section>
      <PostHeader>
        {/* <SaveAlert isSaved={isSaved}>글이 저장 되었습니다.</SaveAlert> */}
        {/* <DefaultButton text="저장" type="outline" size="s" onClick={onSave} /> */}
        {isError && <PostErrorMassage>{errorMassage}</PostErrorMassage>}
        <CreateButton onClick={onPost}>게시</CreateButton>
      </PostHeader>
      <PostTitle />
      <ProjectInfo />
    </section>
  );
};

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  padding: 1.875rem 0;
`;

const CreateButton = styled.button`
  all: unset;
  cursor: pointer;

  width: 8.125rem;
  height: 3.75rem;
  border-radius: 0.25rem;

  background-color: ${({ theme }) => theme.colors.gray8};
  text-align: center;
  color: ${({ theme }) => theme.colors.primary6};
  ${({ theme }) => theme.fonts.subtitle18Bold};
  :hover {
    background-color: ${({ theme }) => theme.colors.gray7};
  }
`;

// interface SaveAlertProps {
//   isSaved: boolean;
// }

// const SaveAlert = styled.span<SaveAlertProps>`
//   opacity: ${({ isSaved }) => (isSaved ? 1 : 0)};
//   transition: all 0.5s ease-in-out;
// `;

export default Post;

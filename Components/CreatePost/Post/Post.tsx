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
  postCoverImage,
  postId,
} from "@/lib/recoil";
import supabase from "@/lib/supabase";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PostTitle from "./PostTitle";
import ProjectInfo from "./ProjectInfo";

/**
 * @TODO 제목 자동완성
 * @TODO 게시 후 컨펌 모달
 * @TODO 유효성 검사 리펙토링
 * @TODO 배경이미지 사이즈 조절
 * @TODO 함께한 팀원 카테고리 추가
 *
 * @TODO user_id 리코일로 관리
 * @TODO 카테고리 중복 선택 , 보여주는 UI
 * @TODO custom hook으로 리팩토링하기
 */
const Post: NextPage = () => {
  const [isPostId] = useRecoilState(postId);
  const [title, setTitle] = useRecoilState(postTitle);
  const [subTitle, setSubTitle] = useRecoilState(postSubTitle);
  const [coverImage, setCoverImage] = useRecoilState(postCoverImage);
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const router = useRouter();

  const newPostRow = {
    id: isPostId,
    title,
    sub_title: subTitle,
    title_background_color: coverImage,
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
      setModalTitle("제목을 입력해주세요.");
      setIsModalOpen(true);
      return false;
    }
    if (!subTitle) {
      setModalTitle("소제목을 입력해주세요.");
      setIsModalOpen(true);
      return false;
    }
    if (!postSubCategory) {
      setModalTitle("카테고리를 선택해주세요.");
      setIsModalOpen(true);
      return false;
    }
    if (skills.length === 0) {
      setModalTitle("스킬을 입력해주세요.");
      setIsModalOpen(true);
      return false;
    }
    if (skills.length !== new Set(skills).size) {
      setModalTitle("개발 스택에 중복이 있습니다.");
      setIsModalOpen(true);
      return false;
    }
    if (skills.some((skill) => skill === "")) {
      setModalTitle("개발 스택에 공백이 있습니다.");
      setIsModalOpen(true);
      return false;
    }
    if (tag.length !== new Set(tag).size) {
      setModalTitle("태그에 중복이 있습니다.");
      setIsModalOpen(true);
      return false;
    }
    if (tag.some((item) => item === "")) {
      setModalTitle("태그에 공백이 있습니다.");
      setIsModalOpen(true);
      return false;
    }
    if (tag.length === 0) {
      setModalTitle("태그를 입력해주세요.");
      setIsModalOpen(true);
      return false;
    }
    if (!content) {
      setModalTitle("내용을 입력해주세요.");
      setIsModalOpen(true);
      return false;
    }
    if (
      members
        .map((member) => Object.values(member))
        .some((item) => item.some((value) => value === ""))
    ) {
      setModalTitle("팀원 정보에 빈칸이 있습니다.");
      setIsModalOpen(true);
      return false;
    }
    return true;
  };

  const resetInput = () => {
    setTitle("");
    setSubTitle("");
    setCoverImage("");
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
      // 컨펌 모달 띄우기
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
    <>
      {isModalOpen && (
        <Modal title={modalTitle} onClose={() => setIsModalOpen(false)} />
      )}
      <section>
        <PostHeader>
          {/* <SaveAlert isSaved={isSaved}>글이 저장 되었습니다.</SaveAlert> */}
          {/* <DefaultButton text="저장" type="outline" size="s" onClick={onSave} /> */}
          <CreateButton onClick={onPost}>게시</CreateButton>
        </PostHeader>
        <PostTitle />
        <ProjectInfo />
      </section>
    </>
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

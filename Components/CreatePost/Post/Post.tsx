import { NextPage } from "next";
import styled from "styled-components";
import { DefaultButton, Modal } from "@/Components/Common";
import getYYYYMM from "@/utils/commons/getYYYYMM";

import { useRecoilState } from "recoil";
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
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PostTitle from "./PostTitle";
import ProjectInfo from "./ProjectInfo";

/**
 * @TODO custom hook으로 리팩토링하기
 * @TODO 카테고리 중복 선택 , 보여주는 UI
 * @TODO user_id 리코일로 관리
 */
const Post: NextPage = () => {
  const [title, setTitle] = useRecoilState(postTitle);
  const [subTitle, setSubTitle] = useRecoilState(postSubTitle);
  const [titleBackgroundColor, setTitleBackgroundColor] = useRecoilState(
    postTitleBackgroundColor
  );
  const [[startDate, endDate], setProjectDuration] =
    useRecoilState(postProjectDuration);
  const [skills, setSkills] = useRecoilState(postSkills);
  const [tag, setTag] = useRecoilState(postTags);
  const [isPublic, setIsPublic] = useRecoilState(postPublic);
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
    setTitleBackgroundColor("");
    setProjectDuration([getYYYYMM(), getYYYYMM()]);
    setSkills([]);
    setTag([]);
    setIsPublic(true);
    setMembers([]);
    setContent("프로젝트 내용을 입력해주세요.");
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
    <>
      {isModalOpen && (
        <Modal title={modalTitle} onClose={() => setIsModalOpen(false)} />
      )}
      <section>
        <PostHeader>
          {/* <SaveAlert isSaved={isSaved}>글이 저장 되었습니다.</SaveAlert> */}
          {/* <DefaultButton text="저장" type="outline" size="s" onClick={onSave} /> */}
          <DefaultButton text="게시" type="full" size="s" onClick={onPost} />
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
  padding: 2.8125rem 0;
  gap: 1.25rem;
`;

// interface SaveAlertProps {
//   isSaved: boolean;
// }

// const SaveAlert = styled.span<SaveAlertProps>`
//   opacity: ${({ isSaved }) => (isSaved ? 1 : 0)};
//   transition: all 0.5s ease-in-out;
// `;

export default Post;

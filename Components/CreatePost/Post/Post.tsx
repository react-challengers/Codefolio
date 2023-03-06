import { NextPage } from "next";
import styled from "styled-components";
import getYYYYMM from "@/utils/commons/getYYYYMM";
import { v4 as uuidv4 } from "uuid";
import { useRecoilState, useSetRecoilState } from "recoil";
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
  postTitleBackgroundImage,
  postId,
  postErrorBoxText,
  postSubCategoryValidate,
  postSkillsValidate,
  postProjectDurationValidate,
  postMembersValidate,
  postGithubUrlValidate,
  postDeployedUrlValidate,
  postContentValidate,
  postTagsValidate,
  postThumbnailCheck,
} from "@/lib/recoil";

import supabase from "@/lib/supabase";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import checkUrl from "@/utils/commons/checkUrl";

import PostTitle from "./PostTitle";
import ProjectInfo from "./ProjectInfo";
import PostErrorMessage from "./PostErrorMessage";

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
  const [isPostId, setIsPostId] = useRecoilState(postId);

  const [title, setTitle] = useRecoilState(postTitle);
  const [subTitle, setSubTitle] = useRecoilState(postSubTitle);
  const [titleBackgroundImage, setTitleBackgroundImage] = useRecoilState(
    postTitleBackgroundImage
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
  const [thumbnailCheck, setThumbnailCheck] =
    useRecoilState(postThumbnailCheck);
  const [userId, setUserId] = useState<string | null>(null);

  const router = useRouter();

  // Validate - 카테고리, 스택, 기간, 키워드태그, 함께한 사람, 깃허브주소, 배포주소, 함께한사람 깃헙레포
  const [errorMessage, setErrorMessage] = useRecoilState(postErrorBoxText);
  const setSubCategoryValidate = useSetRecoilState(postSubCategoryValidate);
  const setSkillsValidate = useSetRecoilState(postSkillsValidate);
  const setProjectDurationValidate = useSetRecoilState(
    postProjectDurationValidate
  );
  const setMembersValidate = useSetRecoilState(postMembersValidate);
  const setTagsValidate = useSetRecoilState(postTagsValidate);
  const setGithubUrlValidate = useSetRecoilState(postGithubUrlValidate);
  const setDeployedUrlValidate = useSetRecoilState(postDeployedUrlValidate);
  const setContentValidate = useSetRecoilState(postContentValidate);

  const newPostRow = {
    id: isPostId,
    title,
    sub_title: subTitle,
    title_background_image: titleBackgroundImage,
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
    thumbnail_check: thumbnailCheck,
  };

  useEffect(() => {
    const LoginState = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setUserId(data.session?.user.id);
      }
    };
    setErrorMessage("");

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

  const postErrorReset = () => {
    setErrorMessage("");
    setSubCategoryValidate("");
    setSkillsValidate("");
    setProjectDurationValidate("");
    setMembersValidate([]);
    setGithubUrlValidate("");
    setDeployedUrlValidate("");
    setContentValidate("");
    setTagsValidate("");
  };

  const ValidateWithPeople = () => {
    const newMembersValidate = [];

    for (let index = 0; index < members.length; index += 1) {
      newMembersValidate.push({ name: "", field: "", github: "" });
      if (members[index].name === "") {
        newMembersValidate[index].name = "필수 입력 항목입니다.";
      }
      if (members[index].field === "") {
        newMembersValidate[index].field = "필수 입력 항목입니다.";
      }
      if (!checkUrl(members[index].github)) {
        newMembersValidate[index].github = "깃허브 주소 형식에 맞지 않습니다.";
      }
    }
    setMembersValidate(newMembersValidate);
  };

  const ValidatePost = () => {
    postErrorReset();
    // 유효성 검사
    if (!postSubCategory) {
      setErrorMessage("필수 입력 항목을 확인해 주세요.");
      setSubCategoryValidate("필수 입력 항목입니다.");
    }
    if (skills.length === 0) {
      setErrorMessage("필수 입력 항목을 확인해 주세요.");
      setSkillsValidate("필수 입력 항목입니다.");
    }
    if (skills.length !== new Set(skills).size) {
      setErrorMessage("필수 입력 항목을 확인해 주세요.");
      setSkillsValidate("중복되는 스택을 확인해 주세요.");
    }
    if (skills.some((skill) => skill === "")) {
      setErrorMessage("필수 입력 항목을 확인해 주세요.");
      setSkillsValidate("필수 입력 항목입니다.");
    }
    if (!content) {
      setErrorMessage("글의 내용을 입력해주세요.");
    }
    if (tag.length !== new Set(tag).size) {
      setErrorMessage("필수 입력 항목을 확인해 주세요.");
      setTagsValidate("중복되는 태그를 확인해 주세요.");
    }
    if (
      members
        .map((member) => Object.values(member))
        .some((item) => item.some((value) => value === ""))
    ) {
      ValidateWithPeople();

      setErrorMessage("필수 입력 항목을 확인해 주세요.");
    }
    if (!title || !subTitle) {
      setErrorMessage("프로젝트 제목 또는 소제목을 입력해주세요");
    }

    if (githubUrl && !checkUrl(githubUrl)) {
      setGithubUrlValidate("깃허브 주소 형식에 맞지 않습니다.");
    }

    if (deployedUrl && !checkUrl(deployedUrl)) {
      setDeployedUrlValidate("사이트 주소 형식에 맞지 않습니다.");
    }

    if (
      !title ||
      !subTitle ||
      members
        .map((member) => Object.values(member))
        .some((item) => item.some((value) => value === "")) ||
      !content ||
      skills.some((skill) => skill === "") ||
      tag.length !== new Set(tag).size ||
      skills.length === 0 ||
      !postSubCategory
    ) {
      return false;
    }

    return true;
  };

  const resetInput = () => {
    setIsPostId(uuidv4());
    setTitle("");
    setSubTitle("");
    setTitleBackgroundImage("");
    setProjectDuration([getYYYYMM(), getYYYYMM()]);
    setSkills([]);
    setTag([]);
    setGithubUrl("");
    setDeployedUrl("");
    setMembers([]);
    setContent("");
    setPostLargeCategory("");
    setPostSubCategory("");
    setThumbnailCheck(false);
  };

  const onPost = async () => {
    // 유효성 검사
    if (!ValidatePost()) {
      return;
    }

    if (!titleBackgroundImage) setThumbnailCheck(false);

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
    <section>
      <PostHeader>
        {/* <SaveAlert isSaved={isSaved}>글이 저장 되었습니다.</SaveAlert> */}
        {/* <DefaultButton text="저장" type="outline" size="s" onClick={onSave} /> */}
        {errorMessage && <PostErrorMessage>{errorMessage}</PostErrorMessage>}
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

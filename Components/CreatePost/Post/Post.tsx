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
  postCoverImage,
  postId,
  postErrorBoxText,
  postSubCategoryVaildate,
  postSkillsVaildate,
  postProjectDurationVaildate,
  postMembersVaildate,
  postGithubUrlVaildate,
  postDeployedUrlVaildate,
  postContentVaildate,
  postTagsVaildate,
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

  const router = useRouter();

  // validate - 카테고리, 스택, 기간, 키워드태그, 함께한 사람, 깃허브주소, 배포주소, 함께한사람 깃헙레포
  const [errorMessage, setErrorMessage] = useRecoilState(postErrorBoxText);
  const setSubCategoryVaildate = useSetRecoilState(postSubCategoryVaildate);
  const setSkillsVaildate = useSetRecoilState(postSkillsVaildate);
  const setProjectDurationVaildate = useSetRecoilState(
    postProjectDurationVaildate
  );
  const setMembersVaildate = useSetRecoilState(postMembersVaildate);
  const setTagsVaildate = useSetRecoilState(postTagsVaildate);
  const setGithubUrlVaildate = useSetRecoilState(postGithubUrlVaildate);
  const setDeployedUrlVaildate = useSetRecoilState(postDeployedUrlVaildate);
  const setContentVaildate = useSetRecoilState(postContentVaildate);

  const newPostRow = {
    id: isPostId,
    title,
    sub_title: subTitle,
    title_background_image: coverImage,
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
    const uuid = uuidv4();
    setIsPostId(uuid);

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
    setSubCategoryVaildate("");
    setSkillsVaildate("");
    setProjectDurationVaildate("");
    setMembersVaildate([]);
    setGithubUrlVaildate("");
    setDeployedUrlVaildate("");
    setContentVaildate("");
    setTagsVaildate("");
  };

  const validateWithPeople = () => {
    const newMembersVaildate = [];

    for (let index = 0; index < members.length; index += 1) {
      newMembersVaildate.push({ name: "", field: "", github: "" });
      if (members[index].name === "") {
        newMembersVaildate[index].name = "필수 입력 항목입니다.";
      }
      if (members[index].field === "") {
        newMembersVaildate[index].field = "필수 입력 항목입니다.";
      }
      if (!checkUrl(members[index].github)) {
        newMembersVaildate[index].github = "깃허브 주소 형식에 맞지 않습니다.";
      }
    }
    setMembersVaildate(newMembersVaildate);
  };

  const validatePost = () => {
    postErrorReset();
    // 유효성 검사
    if (!postSubCategory) {
      setErrorMessage("필수 입력 항목을 확인해 주세요.");
      setSubCategoryVaildate("필수 입력 항목입니다.");
    }
    if (skills.length === 0) {
      setErrorMessage("필수 입력 항목을 확인해 주세요.");
      setSkillsVaildate("필수 입력 항목입니다.");
    }
    if (skills.length !== new Set(skills).size) {
      setErrorMessage("필수 입력 항목을 확인해 주세요.");
      setSkillsVaildate("중복되는 스택을 확인해 주세요.");
    }
    if (skills.some((skill) => skill === "")) {
      setErrorMessage("필수 입력 항목을 확인해 주세요.");
      setSkillsVaildate("필수 입력 항목입니다.");
    }
    if (!content) {
      setErrorMessage("글의 내용을 입력해주세요.");
    }
    if (tag.length !== new Set(tag).size) {
      setErrorMessage("필수 입력 항목을 확인해 주세요.");
      setTagsVaildate("중복되는 태그를 확인해 주세요.");
    }
    if (
      members
        .map((member) => Object.values(member))
        .some((item) => item.some((value) => value === ""))
    ) {
      setErrorMessage("필수 입력 항목을 확인해 주세요.");
    }
    if (!title || !subTitle) {
      setErrorMessage("프로젝트 제목 또는 소제목을 입력해주세요");
    }

    if (githubUrl && !checkUrl(githubUrl)) {
      setGithubUrlVaildate("깃허브 주소 형식에 맞지 않습니다.");
    }

    if (deployedUrl && !checkUrl(deployedUrl)) {
      setDeployedUrlVaildate("사이트 주소 형식에 맞지 않습니다.");
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
    setIsPostId("");
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
    validateWithPeople();
    if (!validatePost()) {
      return;
    }
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

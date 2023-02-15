import { NextPage } from "next";
import styled from "styled-components";
import DefaultButton from "@/Components/Common/DefaultButton";
import PostTitle from "@/Components/Post/PostTitle";
import ProjectInfo from "@/Components/Post/ProjectInfo";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { WithPersonType } from "./WithPeople";
import supabase from "@/lib/supabase";
import { PostType } from "@/types";

/**
 * @TODO 코드블럭
 * @TODO 게시 전 입력창 추가(인원, 기간 등 - 피그마 참고)
 * @TODO file(img) input 에서 color picker로 변경
 * @TODO date picker z-index 해결
 * @TODO Date recoil을 활용한 custom hook으로 리팩토링하기
 * @TODO 개발스택 UI my-page 참고
 * @TODO 카테고리 중복 선택 , 보여주는 UI
 * @TODO 서버통신 연결
 */
const id = crypto.randomUUID();
const Post: NextPage = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [imgFile, setImgFile] = useState("");

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const [techStack, setTechStack] = useState<string[]>([]);
  const [tag, setTag] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState(false);
  const [people, setPeople] = useState<WithPersonType[]>([]);

  const [postContent, setPostContent] = useState("");

  const editorRef = useRef(null);
  const editorText = editorRef.current?.getInstance().getMarkdown();

  enum Field {
    WEB = "웹",
    APP = "앱",
    SOFTWARE = "소프트웨어",
    DATA = "데이터",
    WEB3 = "블록체인",
    DEVOPS = "데브옵스",
    IOT_AND_EMBEDDED = "IOT,임베디드",
    SECURITY = "보안",
  }
  const postRow = {
    id,
    user_id: id,
    title,
    sub_title: subTitle,
    content: postContent,
    thumbnail: imgFile,
    created_at: new Date(),
    progress_date: [String(startDate), String(endDate)],
    github_url: "https://github.com/",
    url: "https://naver.com/",
    is_public: isPublic,
    tag,
    members: people,
    skills: techStack,
    large_category: Field.WEB,
    sub_category: "프론트엔드",
  };

  const onSave = () => {
    // 저장 버튼
    setPostContent(editorText);
  };
  const onPost = async () => {
    // 게시 버튼
    setPostContent(editorText);
    await supabase.from("post").insert(postRow);
  };
  console.log(postContent);
  const PostEditor = dynamic(() => import("./PostEditor"), {
    ssr: false,
  });

  return (
    <MainWrapper>
      <PostHeader>
        <SaveAlert>글이 저장 되었습니다.</SaveAlert>
        <DefaultButton text="저장" type="outline" size="s" onClick={onSave} />
        <DefaultButton text="게시" type="full" size="s" onClick={onPost} />
      </PostHeader>
      <section>
        <PostTitle
          title={title}
          setTitle={setTitle}
          subTitle={subTitle}
          setSubTitle={setSubTitle}
          imgFile={imgFile}
          setImgFile={setImgFile}
        />
        <ProjectInfo
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          techStack={techStack}
          setTechStack={setTechStack}
          tag={tag}
          setTag={setTag}
          isPublic={isPublic}
          setIsPublic={setIsPublic}
          people={people}
          setPeople={setPeople}
        />
      </section>
      <PostEditor
        postContent={postContent}
        setPostContent={setPostContent}
        editorRef={editorRef}
      />
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
const SaveAlert = styled.span``;

export default Post;

import { NextPage } from "next";
import styled from "styled-components";
import DefaultButton from "@/Components/Common/DefaultButton";
import PostTitle from "@/Components/Post/PostTitle";
import ProjectInfo from "@/Components/Post/ProjectInfo";
import { useState } from "react";
import dynamic from "next/dynamic";

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

const Post: NextPage = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [imgFile, setImgFile] = useState("");

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const [techStack, setTechStack] = useState<string[]>([]);

  const onClickTest = () => {
    console.log("hi");
  };

  const PostEditor = dynamic(() => import("./PostEditor"), {
    ssr: false,
  });

  return (
    <MainWrapper>
      <PostHeader>
        <SaveAlert>글이 저장 되었습니다.</SaveAlert>
        <DefaultButton
          text="저장"
          type="outline"
          size="s"
          onClick={onClickTest}
        />
        <DefaultButton text="게시" type="full" size="s" onClick={onClickTest} />
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
        />
      </section>
      <section>
        <PostEditor />
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
const SaveAlert = styled.span``;

export default Post;

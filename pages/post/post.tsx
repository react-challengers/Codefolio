import { NextPage } from "next";
import styled from "styled-components";
import DefaultButton from "@/Components/Common/DefaultButton";
import PostTitle from "@/Components/Post/PostTitle";
import ProjectInfo from "@/Components/Post/ProjectInfo";
import { useState } from "react";
import dynamic from "next/dynamic";

/**
 * @TODO 마크다운
 * @TODO 코드블럭
 */

const Post: NextPage = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [imgFile, setImgFile] = useState("");

  const onClickTest = () => {
    console.log("hi");
  };

  const PostEditor = dynamic(() => import("../../Components/Post/PostEditor"), {
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
        <ProjectInfo />
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

import Post from "@/Components/Post/Post";
import { Editor } from "@toast-ui/react-editor";
import { NextPage, GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useRef } from "react";
import styled from "styled-components";

const CreatePostPage: NextPage = () => {
  const editorRef = useRef<Editor>(null);

  const PostEditor = dynamic(() => import("@/Components/Post/PostEditor"), {
    ssr: false,
  });

  return (
    <MainWrapper>
      <Post />
      <PostEditor editorRef={editorRef} />
    </MainWrapper>
  );
};

const MainWrapper = styled.main`
  max-width: 98.75rem;
  margin: 0 auto;
  margin-bottom: 2.5rem;
`;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default CreatePostPage;

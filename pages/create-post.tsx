import Post from "@/Components/Post/Post";
import { Editor } from "@toast-ui/react-editor";
import { NextPage, GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useRef } from "react";

const CreatePostPage: NextPage = () => {
  const editorRef = useRef<Editor>(null);

  const PostEditor = dynamic(() => import("@/Components/Post/PostEditor"), {
    ssr: false,
  });

  return (
    <>
      <Post />
      <PostEditor editorRef={editorRef} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default CreatePostPage;

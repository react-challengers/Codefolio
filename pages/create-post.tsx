import Post from "@/Components/Post/Post";
import { userLoginCheck } from "@/lib/recoil";
import { Editor } from "@toast-ui/react-editor";
import { NextPage, GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const CreatePostPage: NextPage = () => {
  const isLogin = useRecoilValue(userLoginCheck);

  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      router.push("/auth/login");
    }
  }, []);

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

import Post from "@/Components/CreatePost/Post/Post";
import PostEditor from "@/Components/CreatePost/PostEditor";
import { userLoginCheck } from "@/lib/recoil";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const CreatePostPage = () => {
  const isLogin = useRecoilValue(userLoginCheck);

  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      router.push("/auth/login");
    }
  }, []);

  return (
    <MainWrapper>
      <Post />
      <PostEditor />
    </MainWrapper>
  );
};

const MainWrapper = styled.main`
  max-width: 87.5rem;
  margin: 0 auto;
  margin-bottom: 2.5rem;
`;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default CreatePostPage;

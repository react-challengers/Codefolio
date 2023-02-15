import Post from "@/Components/Post/Post";
import PostEditor from "@/Components/Post/PostEditor";
import { NextPage, GetServerSideProps } from "next";

const CreatePostPage: NextPage = () => {
  return (
    <>
      <Post />
      <PostEditor />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default CreatePostPage;

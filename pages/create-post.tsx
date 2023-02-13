import GNB from "@/Components/Layouts/GNB";
import { NextPage, GetServerSideProps } from "next";
import Post from "./post/post";

const CreatePostPage: NextPage = () => {
  return (
    <>
      <GNB />
      <Post />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default CreatePostPage;

import GNB from "@/Components/Layouts/GNB";
import Post from "@/Components/Post/Post";
import { NextPage, GetServerSideProps } from "next";

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

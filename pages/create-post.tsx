import { NextPage, GetServerSideProps } from "next";

const CreatePostPage: NextPage = () => {
  return <div>1</div>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default CreatePostPage;

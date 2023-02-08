import { NextPage, GetServerSideProps } from 'next';

interface Props {}

const EditPostPage: NextPage<Props> = ({}) => {
  return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default EditPostPage;

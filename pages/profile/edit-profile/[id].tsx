import { NextPage, GetServerSideProps } from 'next';

interface Props {}

const EditProfilePage: NextPage<Props> = ({}) => {
  return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default EditProfilePage;

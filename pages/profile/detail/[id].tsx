import { NextPage, GetServerSideProps } from 'next';

interface Props {}

const ProfileDetailPage: NextPage<Props> = ({}) => {
  return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default ProfileDetailPage;

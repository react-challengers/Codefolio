import { NextPage, GetStaticProps } from 'next';

interface Props {}

const Login: NextPage<Props> = ({}) => {
  return <div></div>;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {},
  };
};

export default Login;

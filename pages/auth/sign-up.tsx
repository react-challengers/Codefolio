import { NextPage, GetStaticProps } from 'next';

interface Props {}

const SignUp: NextPage<Props> = ({}) => {
  return <div></div>;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {},
  };
};

export default SignUp;

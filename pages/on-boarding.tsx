import { NextPage, GetServerSideProps } from "next";

const OnBoardingPage: NextPage = () => {
  return <div>1</div>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default OnBoardingPage;

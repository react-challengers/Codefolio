// import DetailModal from "@/Components/Main/DetailModal";
// import MainSection from "@/Components/Main/MainSection";
// import SideBar from "@/Components/Main/SideBar/SideBar";

import { Banner, DetailModal, MainSection, SideBar } from "@/Components/Main";
import TopButton from "@/Components/Common/TopButton";
import useIsMobile from "@/hooks/common/useIsMobile";
import Head from "next/head";
import { useRef, useState } from "react";
import styled from "styled-components";
// import * as amplitude from "@amplitude/analytics-browser";

const Home = () => {
  const detailRef = useRef<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useIsMobile();

  // Amplitude 실행 시 주석을 풀고 사용하세요.
  // useEffect(() => {
  //   amplitude.track("접속 확인");
  // }, []);

  return (
    <>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <IndexContainer>
        <Banner />
        <HomeContainer>
          {isModalOpen && (
            <ModalContainer>
              <DetailModal setIsModalOpen={setIsModalOpen} />
              <TopButton
                right="calc(50% - 40rem)"
                bottom="10rem"
                elementRef={detailRef}
              />
            </ModalContainer>
          )}
          <SideBar />
          <MainSection setIsModalOpen={setIsModalOpen} />
        </HomeContainer>
      </IndexContainer>
    </>
  );
};

const IndexContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  overflow-y: scroll;
`;

export default Home;

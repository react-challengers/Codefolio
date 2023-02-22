import DetailModal from "@/Components/Main/DetailModal";
import MainSection from "@/Components/Main/MainSection";
import SideBar from "@/Components/Main/SideBar";
import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <HomeContainer>
        {isModalOpen && (
          <ModalContainer>
            <DetailModal setIsModalOpen={setIsModalOpen} />
          </ModalContainer>
        )}
        <SideBar />
        <MainSection setIsModalOpen={setIsModalOpen} />
      </HomeContainer>
    </>
  );
};

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

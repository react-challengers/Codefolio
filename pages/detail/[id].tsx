import DetailHeader from "@/Components/Detail/DetailHeader";
import { NextPage } from "next";
import styled from "styled-components";

const DetailPage: NextPage = () => {
  return (
    <DetailPageContainer>
      <DetailHeader />
    </DetailPageContainer>
  );
};

const DetailPageContainer = styled.div``;

export default DetailPage;

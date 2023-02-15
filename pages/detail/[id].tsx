import {
  Comment,
  DetailHeader,
  DetailSide,
  DetailTitle,
  RelatedProject,
} from "@/Components/Detail";
import { NextPage } from "next";
import Comment from "@/Components/Detail/Comment";

const DetailPage: NextPage = () => {
  const detailTitleData = {
    title: "타이틀",
    subtitle: "서브타이틀",
    field: "대분류",
    subCategory: "소분류",
  };
  return (
    <DetailPageContainer>
      <DetailHeader />
      <DetailTitle {...detailTitleData} />
      <DetailContentsContainer>
        <DetailContentsSide>
          <DetailSide />
        </DetailContentsSide>
        <DetailContentsMain>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo animi
          vitae odit aut! Quisquam nam, minima facere aspernatur enim illo
          corporis error obcaecati. Magnam cum possimus in fugit excepturi
          pariatur! Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Nemo animi vitae odit aut! Quisquam nam, minima facere aspernatur enim
          illo corporis error obcaecati. Magnam cum possimus in fugit excepturi
          pariatur! Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Nemo animi vitae odit aut! Quisquam nam, minima facere aspernatur enim
          illo corporis error obcaecati. Magnam cum possimus in fugit excepturi
          pariatur!
        </DetailContentsMain>
      </DetailContentsContainer>
      <RelatedProject />
      <Comment />
    </DetailPageContainer>
  );
};

const DetailPageContainer = styled.div`
  width: 87.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  background-color: white;
  border-radius: 0.5rem;

  z-index: 1;
`;

const DetailContentsContainer = styled.div`
  width: 100%;
  padding: 0 7.5rem;
  margin-top: 2.5rem;
  display: flex;
`;

const DetailContentsMain = styled.main`
  width: 100%;
  min-height: 50rem;
  margin-left: 1.25rem;
`;

const DetailContentsSide = styled.aside``;

export default DetailPage;

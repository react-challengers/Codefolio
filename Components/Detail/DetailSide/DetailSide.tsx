import styled from "styled-components";
import DetailSideBadge from "./DetailSideBadges";
import DetailSideProject from "./DetailSideProject";
import DetailSidePeople from "./DetailSidePeople";

interface DetailSideProps {
  progressDate: string[];
  subCategory: string;
  tag: string[];
  skills: string[];
  members: string[];
  authorInfo: UserProfileType | null | undefined;
}

const DetailSide = ({
  progressDate,
  subCategory,
  tag,
  skills,
  members,
  authorInfo,
}: DetailSideProps) => {
  return (
    <SideContainer>
      <DetailSideBadge />
      <DetailSideProject
        progressDate={progressDate}
        tag={tag}
        skills={skills}
      />
      <DetailSidePeople
        github=""
        authorInfo={authorInfo}
        subCategory={subCategory}
        members={members}
      />
    </SideContainer>
  );
};

const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export default DetailSide;

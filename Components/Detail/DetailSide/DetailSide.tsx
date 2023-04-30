import styled from "styled-components";
import DetailSideBadge from "./DetailSideBadges";
import DetailSideProject from "./DetailSideProject";
import DetailSidePeople from "./DetailSidePeople";

interface DetailSideProps {
  progressDate: string[];
  subCategory: string;
  tag: string[];
  skills: string[];
  members: MembersType[];
  authorInfo: UserProfileType | null | undefined;
  githubUrl: string | undefined;
  deployUrl: string | undefined;
}

const DetailSide = ({
  progressDate,
  subCategory,
  tag,
  skills,
  members,
  authorInfo,
  githubUrl,
  deployUrl,
}: DetailSideProps) => {
  return (
    <SideContainer>
      <DetailSideBadge />
      <DetailSideProject
        progressDate={progressDate}
        tag={tag}
        skills={skills}
        githubUrl={githubUrl}
        deployUrl={deployUrl}
      />
      <DetailSidePeople
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

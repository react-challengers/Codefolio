import { Tags } from "@/Components/Common";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Title } from "./DetailSideBadges";
import DetailSideContainer from "./DetailSideContainer";

interface DetailSideProjectProps {
  progressDate: string[];
  skills: string[];
  tag: string[];
  githubUrl?: string;
  deployUrl?: string;
}

const DetailSideProject = ({
  progressDate,
  skills,
  tag,
  githubUrl = "",
  deployUrl = "",
}: DetailSideProjectProps) => {
  const router = useRouter();
  return (
    <DetailSideContainer>
      <TitleWrapper>
        <Title>프로젝트 기간</Title>
        <Description>
          {progressDate[0]} ~
          {progressDate[1] === "1900-01" ? "진행중" : progressDate[1]}
        </Description>
      </TitleWrapper>

      {githubUrl && (
        <DetailSideWrapper>
          <Title>깃허브 주소</Title>
          <UrLWrapper onClick={() => router.push(githubUrl)}>
            <Image
              src="/icons/github.svg"
              width="24"
              height="24"
              alt="깃허브 주소"
            />
          </UrLWrapper>
        </DetailSideWrapper>
      )}

      {deployUrl && (
        <DetailSideWrapper>
          <Title>배포 주소</Title>
          <UrLWrapper onClick={() => router.push(deployUrl)}>
            <p>{deployUrl}</p>
          </UrLWrapper>
        </DetailSideWrapper>
      )}

      <DetailSideWrapper>
        <Title>개발스택</Title>
        <Tags tagItems={skills} />
      </DetailSideWrapper>

      <DetailSideWrapper>
        <Title>키워드 태그</Title>
        <Tags tagItems={tag} color="white" />
      </DetailSideWrapper>
    </DetailSideContainer>
  );
};

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const UrLWrapper = styled.div`
  ${({ theme }) => theme.fonts.subtitle16}
  p {
    color: ${({ theme }) => theme.colors.gray2};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration-line: underline;
  }
  cursor: pointer;
`;

const Description = styled.span`
  ${({ theme }) => theme.fonts.subtitle16}
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.gray2};
`;

const DetailSideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default DetailSideProject;

import { ProfileImage } from "@/Components/Common";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { Title } from "./DetailSideBadges";
import DetailSideContainer from "./DetailSideContainer";
import DetailWith from "./DetailWith";

interface DetailSidePeopleProps {
  authorInfo: UserProfileType | null | undefined;
  subCategory: string;
  members: string[];
}

const DetailSidePeople = ({
  authorInfo,
  subCategory,
  members,
}: DetailSidePeopleProps) => {
  return (
    <DetailSideContainer>
      <DetailSideWrapper>
        <Title>작성자</Title>
        <ProfileWrapper>
          <UserInfoWrapper>
            <ProfileImage
              src={authorInfo?.profile_image}
              alt="프로필 사진"
              page="detailPage"
            />
            <UserInfo>
              <h2>{authorInfo?.user_name}</h2>
              <p>{subCategory}</p>
            </UserInfo>
          </UserInfoWrapper>

          <Link target="_blank" href={authorInfo?.github ?? ""}>
            <GithubImage
              src="/icons/github.svg"
              width={20}
              height={20}
              alt="깃허브 주소"
            />
          </Link>
        </ProfileWrapper>
      </DetailSideWrapper>

      <DetailSideWrapper>
        {members.length !== 0 && <Title>함께한 사람들</Title>}
        {members.map(
          ({ name, field, github: memberGithub }: any, idx: number) => (
            <DetailWith
              key={idx}
              name={name}
              field={field}
              github={memberGithub}
            />
          )
        )}
      </DetailSideWrapper>
    </DetailSideContainer>
  );
};

const DetailSideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    ${({ theme }) => theme.fonts.subtitle16};
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.gray2};
  }
  p {
    ${({ theme }) => theme.fonts.body14};
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.gray4};
  }
`;

const GithubImage = styled(Image)`
  width: 100%;
  cursor: pointer;
`;

export default DetailSidePeople;

import { ProfileImage } from "@/Components/Common";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

export interface DetailWithProps {
  profileImage?: string;
  name: string;
  field: string;
  github: string;
}

const DetailWith = ({
  profileImage = "",
  name,
  field,
  github,
}: DetailWithProps) => {
  return (
    <ProfileWrapper>
      <UserInfoWrapper>
        <ProfileImage src={profileImage} alt="프로필 사진" page="detailPage" />
        <UserInfo>
          <h2>{name}</h2>
          <p>{field}</p>
        </UserInfo>
      </UserInfoWrapper>

      <Link target="_blank" href={github}>
        <GithubImage
          src="/icons/github.svg"
          width={20}
          height={20}
          alt="깃허브 주소"
        />
      </Link>
    </ProfileWrapper>
  );
};

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
  gap: 0.5rem;

  h2 {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.gray2};
  }
  p {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.gray4};
  }
`;

const GithubImage = styled(Image)`
  width: 100%;
  cursor: pointer;
`;

export default DetailWith;

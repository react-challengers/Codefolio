import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import ProfileImage from "../Common/ProfileImage";
import Banner from "./Banner";

interface UserInfoContainerProps {
  username: string;
  email: string;
  selfProfile: string;
}

const UserInfoContainer = ({
  username,
  email,
  selfProfile,
}: UserInfoContainerProps) => {
  const router = useRouter();
  return (
    <InfoContainer>
      <Banner />
      <UserInfoWrapper>
        <ProfileImageWrapper>
          <ProfileImage alt="유저 프로필" page="myPage" />
        </ProfileImageWrapper>
        <EditIconWrapper onClick={() => router.push("/profile/edit-profile")}>
          <Image
            src="/icons/edit.svg"
            alt="편집 아이콘"
            width="24"
            height="24"
          />
        </EditIconWrapper>
        <TextWrapper>
          <UserNameWrapper>{username}</UserNameWrapper>
          <EmailWrapper>{email}</EmailWrapper>
          <SelfProfileWrapper>{selfProfile}</SelfProfileWrapper>
        </TextWrapper>
      </UserInfoWrapper>
    </InfoContainer>
  );
};

const InfoContainer = styled.div`
  width: 100vw;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UserInfoWrapper = styled.div`
  max-width: 64rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center;
`;

const ProfileImageWrapper = styled.div`
  position: absolute;
  top: -3.25rem;
`;

const EditIconWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  right: 0rem;
`;

const TextWrapper = styled.div`
  margin-top: 5rem;
`;
const UserNameWrapper = styled.p`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;
const EmailWrapper = styled.p`
  color: grey;
  margin-bottom: 1.5rem;
`;
const SelfProfileWrapper = styled.div`
  padding: 1.25rem;
  border: 0.0625rem solid lightgrey;
`;

export default UserInfoContainer;

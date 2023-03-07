import Image from "next/image";
import styled from "styled-components";
import { useUserProfile } from "@/hooks/query";
import { ProfileImage, Tags } from "@/Components/Common";
import { SyncLoader } from "react-spinners";
import Link from "next/link";
import { useSetRecoilState } from "recoil";
import {
  myPageCurrentTab,
  myPageIsEditingProfileContainer,
} from "@/lib/recoil";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/utils/APIs/supabase";
import Banner from "./Banner";
import useUserImage from "./useUserImage";

interface UserInfoContainerType {
  profileUserId?: string;
}

/**
 * @TODO SelfProfileWrapper 최대 3줄로 제한
 * @TODO 깃헙 아이콘 white로 변경
 * @TODO 활동분야, 기술 스택 tags추가
 */

const UserInfoContainer = ({ profileUserId }: UserInfoContainerType) => {
  const { profileData } = useUserProfile(profileUserId);
  const setCurrentTab = useSetRecoilState(myPageCurrentTab);
  const { handleImage: handleProfileImage } = useUserImage("profile_image");
  const setIsEditing = useSetRecoilState(myPageIsEditingProfileContainer);

  const { data } = useQuery(["CURRENT_USER"], getUser);

  if (!profileData.id || !profileData.user_id) {
    return (
      <InfoContainer>
        <Loader color="#3DDFE9" margin={4} size={16} speedMultiplier={1} />
      </InfoContainer>
    );
  }

  const checkProfileAuthorization = () => {
    if (!data || !profileData) return false;
    return profileData.user_id === data?.id;
  };

  const handleChangeTab = () => {
    setCurrentTab(3);
    setIsEditing(true);
    // TODO: 다른 사람 프로필을을 볼 주석해제하고 로직 추가하고 위에 setCurrentTab에 대입하는 값은 1 더하기
    // setCurrentTab(2);
  };

  return (
    <InfoContainer>
      <Banner
        src={profileData.background_image}
        checkProfileAuthorization={checkProfileAuthorization()}
      />
      <UserInfoWrapper>
        <ProfileImageWrapper>
          <label htmlFor="user_profile">
            {checkProfileAuthorization() ? (
              <ProfileFileImageInput
                type="file"
                accept="image/*"
                onChange={handleProfileImage}
                multiple={false}
                id="user_profile"
              />
            ) : null}
            <ProfileImage
              alt="유저 프로필"
              page="myPage"
              src={profileData.profile_image}
            />
          </label>
          <IconBox
            onClick={handleChangeTab}
            checkProfileAuthorization={checkProfileAuthorization()}
          >
            <Image
              src="/icons/ico-edit.svg"
              alt="편집 아이콘"
              width="36"
              height="36"
            />
          </IconBox>
        </ProfileImageWrapper>
        <TextWrapper>
          <>
            <ProfileInfoContainer>
              <ProfileInfoWrapper>
                <UserNameWrapper>{profileData.user_name}</UserNameWrapper>
                <EmailWrapper>{profileData.contact_email}</EmailWrapper>
                <Tags tagItems={profileData.field} color="white" />
              </ProfileInfoWrapper>
              {profileData.github ? (
                <Link href={profileData.github || ""}>
                  <GithubImage
                    src="/icons/github.svg"
                    width={36}
                    height={36}
                    alt="깃허브 주소"
                  />
                </Link>
              ) : (
                <div> </div>
              )}
            </ProfileInfoContainer>
            <SelfProfileWrapper>{profileData.self_profile}</SelfProfileWrapper>
          </>
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
  max-width: 58.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const ProfileImageWrapper = styled.div`
  position: absolute;
  top: -3.25rem;
`;

const ProfileFileImageInput = styled.input`
  display: none;
`;

const IconBox = styled.div<{ checkProfileAuthorization: boolean }>`
  cursor: pointer;
  position: absolute;
  right: -0.375rem;
  bottom: -0.375rem;
  z-index: 1;
  visibility: ${(props) =>
    props.checkProfileAuthorization ? "visible" : "hidden"};
`;

const TextWrapper = styled.div`
  margin: 4rem 0 0;
  display: flex;
  flex-direction: column;
`;

const GithubImage = styled(Image)`
  width: 2.25rem;
  height: 2.25rem;
  cursor: pointer;
  fill: ${(props) => props.theme.colors.white} !important;
`;

// isEditing false
const ProfileInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  height: 2.25rem;
  margin: 0 0 2.5rem;
`;

const ProfileInfoWrapper = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

const UserNameWrapper = styled.p`
  font-size: 1.5rem;
  color: ${(prop) => prop.theme.colors.white};
`;

const EmailWrapper = styled.p`
  color: ${(props) => props.theme.colors.gray4};
  ${(props) => props.theme.fonts.body16}
`;

const SelfProfileWrapper = styled.div`
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.gray7};
  line-height: 1.5rem;
  width: 58.75rem;
  color: ${(props) => props.theme.colors.white};
  ${(props) => props.theme.fonts.body16}
  text-align: justify;
`;

const Loader = styled(SyncLoader)`
  width: 7.5rem !important;
  height: 7.5rem !important;
  padding: 8.6875rem;
  margin: 2.5rem 0 3.875rem;
`;

export default UserInfoContainer;

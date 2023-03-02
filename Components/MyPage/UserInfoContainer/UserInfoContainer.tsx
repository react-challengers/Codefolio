import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { useUserProfile } from "@/hooks/query";
import { useInput } from "@/hooks/common";
import { ProfileImage } from "@/Components/Common";
import { ClimbingBoxLoader } from "react-spinners";
import Banner from "./Banner";
import useUserImage from "./useUserImage";

/**
 * @TODO SelfProfileWrapper 최대 3줄로 제한하기
 */
const UserInfoContainer = () => {
  const { profileData, updateProfileData } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);

  const { handleImage: handleProfileImage } = useUserImage("profile_image");
  const { handleImage: handleBackgroundImage } =
    useUserImage("background_image");

  const { inputValues, handleInputChange } = useInput({
    userName: profileData.user_name ?? "",
    contactEmail: profileData.contact_email ?? "",
    selfProfile: profileData.self_profile ?? "",
  });

  const handleIsEditing = async () => {
    // 갱신된 데이터 서버에 반영
    if (isEditing) {
      setIsEditing(false);
      const newProfileData: UserProfileType = {
        ...profileData,
        user_name: inputValues.userName,
        contact_email: inputValues.contactEmail,
        self_profile: inputValues.selfProfile,
      };
      updateProfileData(newProfileData);
    } else {
      setIsEditing(true);
    }
  };

  if (!profileData.id || !profileData.user_id) {
    return (
      <InfoContainer>
        <Loader color="#3B89E3" size={20} speedMultiplier={2} />
      </InfoContainer>
    );
  }

  return (
    <InfoContainer>
      <Banner src={profileData.background_image} />
      <UserInfoWrapper>
        <ProfileImageWrapper>
          <label htmlFor="user_profile">
            <ProfileFileImageInput
              type="file"
              accept="image/*"
              onChange={handleProfileImage}
              multiple={false}
              id="user_profile"
            />
            <ProfileImage
              alt="유저 프로필"
              page="myPage"
              src={profileData.profile_image}
            />
          </label>
          <IconBox onClick={() => handleIsEditing()}>
            <Image
              src="/icons/ico-edit.svg"
              alt="편집 아이콘"
              width="36"
              height="36"
            />
          </IconBox>
        </ProfileImageWrapper>
        {/* <IconWrapper></IconWrapper> */}
        <TextWrapper>
          {isEditing ? (
            <InputWrapper>
              <UserNameInput
                value={inputValues.userName}
                onChange={handleInputChange("userName")}
              />
              <EmailInput
                value={inputValues.contactEmail}
                onChange={handleInputChange("contactEmail")}
              />
              <SelfProfileInput
                value={inputValues.selfProfile}
                onChange={handleInputChange("selfProfile")}
                rows={3}
              />
            </InputWrapper>
          ) : (
            <>
              <ProfileInfoWrapper>
                <UserNameWrapper>{profileData.user_name}</UserNameWrapper>
                <EmailWrapper>{profileData.contact_email}</EmailWrapper>
              </ProfileInfoWrapper>
              <SelfProfileWrapper>
                {profileData.self_profile}
              </SelfProfileWrapper>
            </>
          )}
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
  position: relative;
`;

const ProfileImageWrapper = styled.div`
  position: absolute;
  top: -3.25rem;
`;

const ProfileFileImageInput = styled.input`
  display: none;
`;

const IconBox = styled.div`
  cursor: pointer;
  position: absolute;
  right: -0.375rem;
  bottom: -0.375rem;
  z-index: 1;
`;

const TextWrapper = styled.div`
  margin: 4rem 0 0;
  display: flex;
  flex-direction: column;
`;

// isEditing false
const ProfileInfoWrapper = styled.div`
  display: flex;
  padding: 0 1.5rem;
  gap: 0.75rem;
  align-items: center;
  height: 2.25rem;
  margin: 0 0 2.5rem;
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
  width: 64rem;
  color: ${(props) => props.theme.colors.white};
  ${(props) => props.theme.fonts.body16}
  text-align: justify;
`;

// isEditing true
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserNameInput = styled.input`
  font-size: 1.5rem;
  text-align: center;
  width: 32rem;
  border-width: 0 0 1px;
  border-color: gray;
  padding: 0.5rem 0;
  margin: 0 0 0.5rem;
`;

const EmailInput = styled.input`
  color: gray;
  width: 32rem;
  text-align: center;
  font-size: 1rem;
  margin: 0 0 1rem;
  border-width: 0 0 1px;
  border-color: gray;
  padding: 0.5rem 0;
  margin: 0.5rem 0 1.25rem;
`;

const SelfProfileInput = styled.textarea`
  padding: 1.25rem 0;
  font-size: 1rem;
  text-align: center;
  height: calc(4.125rem - 2.5rem);
  width: 64rem;
  border: 1px solid lightgrey;
  resize: none;
`;

const Loader = styled(ClimbingBoxLoader)`
  width: 7.5rem !important;
  height: 7.5rem !important;
  padding: 8.6875rem;
  margin: 2.5rem 0 5rem;
`;

export default UserInfoContainer;

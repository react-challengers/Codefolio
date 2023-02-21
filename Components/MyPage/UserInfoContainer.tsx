import supabase from "@/lib/supabase";
import Image, { StaticImageData } from "next/image";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import convertEase64ToFile from "@/utils/commons/convertBase64ToFile";
import { useUserProfile } from "@/hooks/query";
import { useInput } from "@/hooks/common";
import ProfileImage from "../Common/ProfileImage";
import Banner from "./Banner";
import color_fill from "../../public/icons/color_fill.svg";

/**
 * @TODO SelfProfileWrapper 최대 3줄로 제한하기
 * @TODO 프로필 데이터 react-query를 캐싱하기
 */

const UserInfoContainer = () => {
  const { profileData, updateProfileData } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);

  const { inputValues, handleInputChange } = useInput({
    userName: profileData.user_name,
    contactEmail: profileData.contact_email,
    selfProfile: profileData.self_profile,
    backgroundColor: profileData.background_color,
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
        background_color: inputValues.backgroundColor,
      };
      updateProfileData(newProfileData);
    } else {
      setIsEditing(true);
    }
  };

  const uploadImage = async (file: File) => {
    const imgPath = crypto.randomUUID();
    try {
      await supabase.storage.from("post-image").upload(imgPath, file);
      const { data } = await supabase.storage
        .from("post-image")
        .getPublicUrl(imgPath);
      return data.publicUrl;
    } catch (error) {
      return "";
    }
  };

  const handleProfileImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = async (uploadedBlob) => {
      const imgDataUrl = uploadedBlob.target?.result; // input의 파일을 base64로 받습니다.
      if (typeof imgDataUrl !== "string") return;
      const imgFile = await convertEase64ToFile(imgDataUrl);
      const publicImageURL = await uploadImage(imgFile);
      if (!publicImageURL) return;
      await supabase
        .from("user_profile")
        .update({ profile_image: publicImageURL })
        .eq("id", profileData.id);
    };
  };

  return (
    <InfoContainer>
      <Banner userBackground={inputValues.backgroundColor} />
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
        </ProfileImageWrapper>
        <IconWrapper>
          <IconBox onClick={() => handleIsEditing()}>
            <Image
              src="/icons/edit.svg"
              alt="편집 아이콘"
              width="24"
              height="24"
            />
          </IconBox>
        </IconWrapper>
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
              <ImgLabel htmlFor="background-color-picker">
                <ImgIcon
                  src={color_fill}
                  alt="배경색 지정 아이콘"
                  width={36}
                  height={36}
                />
                <UserBackgroundColorPicker
                  id="background-color-picker"
                  type="color"
                  onChange={handleInputChange("backgroundColor")}
                />
              </ImgLabel>
            </InputWrapper>
          ) : (
            <>
              <UserNameWrapper>{inputValues.userName}</UserNameWrapper>
              <EmailWrapper>{inputValues.contactEmail}</EmailWrapper>
              <SelfProfileWrapper>{inputValues.selfProfile}</SelfProfileWrapper>
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
  align-items: center;
  position: relative;
  text-align: center;
`;

const ProfileImageWrapper = styled.div`
  position: absolute;
  top: -3.25rem;
`;

const ProfileFileImageInput = styled.input`
  display: none;
`;

const IconWrapper = styled.div`
  display: flex;
  gap: 0.75rem;
  position: absolute;
  right: 0rem;
`;

const IconBox = styled.div`
  cursor: pointer;
`;

const TextWrapper = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
`;

// isEditing false
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
  border: 1px solid lightgrey;
  line-height: 1.5rem;
  width: 64rem;
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

const ImgLabel = styled.label`
  position: absolute;
  right: 0;
  top: 0;
`;

const ImgIcon = styled(Image)<StaticImageData>`
  cursor: pointer;
`;

const UserBackgroundColorPicker = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

export default UserInfoContainer;

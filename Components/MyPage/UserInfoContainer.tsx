import {
  myPageContactEmail,
  myPagePhonNumber,
  myPageSelfProfile,
  myPageUserId,
  myPageUserName,
  myPageBackgroundColor,
  myPageProfileImage,
  myPageUserProfile,
  myPageId,
  myPageGender,
  myPageCareer,
  myPageField,
  myPageBirthYear,
  myPageSkills,
  myPageIsPublic,
} from "@/lib/recoil";
import supabase from "@/lib/supabase";
import Image, { StaticImageData } from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import convertEase64ToFile from "@/utils/commons/convertBase64ToFile";
import { useUserProfile } from "@/hooks/query";
import ProfileImage from "../Common/ProfileImage";
import Banner from "./Banner";
import color_fill from "../../public/icons/color_fill.svg";

/**
 * @TODO SelfProfileWrapper 최대 3줄로 제한하기
 * @TODO 프로필 데이터 react-query를 캐싱하기
 */

const UserInfoContainer = () => {
  const { updateProfileData } = useUserProfile();

  const setUserProfileId = useSetRecoilState(myPageId);
  const [userName, setUserName] = useRecoilState(myPageUserName);
  const [contactEmail, setContactEmail] = useRecoilState(myPageContactEmail);
  const [selfProfile, setSelfProfile] = useRecoilState(myPageSelfProfile);
  const setPhone = useSetRecoilState(myPagePhonNumber);
  const setUserId = useSetRecoilState(myPageUserId);
  const [userBackground, setUserBackground] = useRecoilState(
    myPageBackgroundColor
  );
  const [profileImage, setProfileImage] = useRecoilState(myPageProfileImage);
  const userProfile = useRecoilValue(myPageUserProfile);
  const setGender = useSetRecoilState(myPageGender);
  const setCareer = useSetRecoilState(myPageCareer);
  const setField = useSetRecoilState(myPageField);
  const setBirthYear = useSetRecoilState(myPageBirthYear);
  const setSkills = useSetRecoilState(myPageSkills);
  const setPublic = useSetRecoilState(myPageIsPublic);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getUserProfile = async () => {
      const { data, error: getUserIdError } = await supabase.auth.getUser();
      if (getUserIdError || !data.user?.email) return;

      const { data: userProfileData, error } = await supabase
        .from("user_profile")
        .select("*")
        .eq("user_id", data.user.id)
        .single();

      if (error) return;
      const {
        contact_email: contactEmailData,
        user_name: userNameData,
        user_id: userId,
        self_profile: selfProfileData,
        profile_image: profileImageData,
        background_color: backgroundColor,
        id,
        phone,
        gender,
        career,
        field,
        birth_year: birthYear,
        skills,
        is_public: isPublic,
      } = userProfileData;
      setUserProfileId(id);
      setUserId(userId);
      setUserName(userNameData);
      setContactEmail(contactEmailData);
      setSelfProfile(selfProfileData);
      setProfileImage(profileImageData);
      setUserBackground(backgroundColor);
      setPhone(phone);
      setGender(gender);
      setCareer(career);
      setField(JSON.parse(`${field}`));
      setBirthYear(birthYear);
      setSkills(skills);
      setPublic(isPublic);
    };
    getUserProfile();
  }, [
    setUserName,
    setContactEmail,
    setSelfProfile,
    setUserBackground,
    setUserId,
    setProfileImage,
    setUserProfileId,
    setPhone,
    setGender,
    setBirthYear,
    setCareer,
    setField,
    setPublic,
    setSkills,
  ]);

  const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const handleContactEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setContactEmail(e.target.value);
  };
  const handleSelfProfile = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSelfProfile(e.target.value);
  };

  const onChangeBackgroundColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserBackground(e.target.value);
  };

  const handleIsEditing = async () => {
    // 갱신된 데이터 서버에 반영
    if (isEditing) {
      setIsEditing(false);
      updateProfileData(userProfile);
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
    const [file] = e.target.files as FileList;
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async (uploadedBlob) => {
      const imgDataUrl = uploadedBlob.target?.result as string; // input의 파일을 base64로 받습니다.
      if (!imgDataUrl) return;
      const imgFile = await convertEase64ToFile(imgDataUrl);
      const publicImageURL = await uploadImage(imgFile);
      if (!publicImageURL) return;
      setProfileImage(publicImageURL);
    };
  };

  return (
    <InfoContainer>
      <Banner userBackground={userBackground} />
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
            <ProfileImage alt="유저 프로필" page="myPage" src={profileImage} />
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
              <UserNameInput value={userName} onChange={handleUserName} />
              <EmailInput value={contactEmail} onChange={handleContactEmail} />
              <SelfProfileInput
                value={selfProfile}
                onChange={handleSelfProfile}
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
                  onChange={onChangeBackgroundColor}
                />
              </ImgLabel>
            </InputWrapper>
          ) : (
            <>
              <UserNameWrapper>{userName}</UserNameWrapper>
              <EmailWrapper>{contactEmail}</EmailWrapper>
              <SelfProfileWrapper>{selfProfile}</SelfProfileWrapper>
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

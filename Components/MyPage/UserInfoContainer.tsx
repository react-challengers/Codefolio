import {
  myPageContactEmail,
  myPagePhonNumber,
  myPageSelfProfile,
  myPageUserName,
  userLoginCheck,
} from "@/lib/recoil";
import supabase from "@/lib/supabase";
import { Field } from "@/types/enums";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import ProfileImage from "../Common/ProfileImage";
import Banner from "./Banner";

/**
 * @TODO 회원가입에 user-profile row 추가 기능 확인하면 USER_ID 상수를 삭제하고 서버 데이터를 활용합니다.
 * @TODO SelfProfileWrapper 최대 3줄로 제한하기
 */

const USER_ID = "dbabf656-18e8-484d-aac9-e5065667a31a";

const UserInfoContainer = () => {
  const [userName, setUserName] = useRecoilState(myPageUserName);
  const [contactEmail, setContactEmail] = useRecoilState(myPageContactEmail);
  const [selfProfile, setSelfProfile] = useRecoilState(myPageSelfProfile);
  const phone = useRecoilValue(myPagePhonNumber);

  const [isEditing, setIsEditing] = useState(false);

  const uploadedImage = useRef<HTMLInputElement>(null);
  const imageUploader = useRef(null);

  const getUserProfile = async () => {
    const { data: userProfile } = await supabase
      .from("user-profile")
      .select()
      .eq("id", USER_ID)
      .single();
    const {
      contact_email: contactEmailData,
      user_name: userNameData,
      self_profile: selfProfileData,
    } = userProfile;
    setUserName(userNameData);
    setContactEmail(contactEmailData);
    setSelfProfile(selfProfileData);
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const handleContactEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setContactEmail(e.target.value);
  };
  const handleSelfProfile = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSelfProfile(e.target.value);
  };

  const userInfo: Omit<UserProfileType, "id"> = {
    // id: "uuid",
    user_id: "nno3onn@naver.com",
    user_name: userName,
    contact_email: contactEmail,
    gender: "여자",
    bookmark_folders: ["example"],
    phone,
    field: [Field.WEB],
    skills: ["a", "b", "c"],
    career: "3년차",
    is_public: true,
    birth_year: "1997",
    profile_image: "",
    self_profile: selfProfile,
  };

  const handleIsEditing = async () => {
    // 갱신된 데이터 서버에 반영
    if (isEditing) {
      setIsEditing(false);
      const { error } = await supabase
        .from("user-profile")
        .update(userInfo)
        .eq("id", USER_ID);
      console.log(error);
    } else {
      setIsEditing(true);
    }
  };

  const router = useRouter();

  const setUserLogin = useSetRecoilState(userLoginCheck);

  const onLogoutButtonClick = async () => {
    const res = await supabase.auth.signOut();
    setUserLogin(false);
    if (res.error) {
      throw new Error(res.error.message);
    }
    return router.push("/");
  };

  const uploadImage = async (blob: File) => {
    try {
      const imgPath = crypto.randomUUID();
      await supabase.storage.from("post-image").upload(imgPath, blob);

      // 이미지 올리기
      const { data } = await supabase.storage
        .from("post-image")
        .getPublicUrl(imgPath);
      console.log("upload image", data);
      return data.publicUrl;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleProfileImage = (e: ChangeEvent<HTMLInputElement>) => {
    const [file] = e.target.files!;
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async (uploadedBlob) => {
      const imgDataUrl = uploadedBlob.target?.result; // data:image/jpeg;base64,/
      // 타입 지정 문제
      uploadImage(imgDataUrl);
      // recoil로 set하기
    };
  };

  return (
    <InfoContainer>
      <Banner />
      <UserInfoWrapper>
        <ProfileImageWrapper>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileImage}
            ref={imageUploader}
            multiple={false}
          />
          <ProfileImage
            alt="유저 프로필"
            page="myPage"
            src="https://xxfgrnzupwpguxifhwsq.supabase.co/storage/v1/object/public/profile-imgage/1ad99168-f160-4114-bdd8-25ccdc26053c_screenshot.jpg?t=2023-02-17T05%3A02%3A17.171Z"
          />
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
          <IconBox>
            <button type="button" onClick={() => onLogoutButtonClick()}>
              로그아웃
            </button>
          </IconBox>
        </IconWrapper>
        <TextWrapper>
          {isEditing ? (
            <>
              <UserNameInput value={userName} onChange={handleUserName} />
              <EmailInput value={contactEmail} onChange={handleContactEmail} />
              <SelfProfileInput
                value={selfProfile}
                onChange={handleSelfProfile}
                rows={3}
              />
            </>
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
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
`;

// isEditing true
const UserNameInput = styled.input`
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  width: calc(100% - 2rem);
  padding: 1rem;
  border-radius: 0.25rem;
  border: solid 1px gray;
`;

const EmailInput = styled.input`
  color: gray;
  margin-bottom: 0.75rem;
  width: calc(100% - 2rem);
  padding: 0.75rem 1rem;
  border-radius: 0.25rem;
  border: solid 1px gray;
`;

const SelfProfileInput = styled.textarea`
  padding: 1.25rem;
  font-size: 1rem;
  width: calc(100% - 2rem);
  border-radius: 0.25rem;
  border: solid 1px gray;
  width: 64rem;
  resize: none;
`;

export default UserInfoContainer;

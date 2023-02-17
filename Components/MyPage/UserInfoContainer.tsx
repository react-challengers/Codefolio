import {
  myPageContactEmail,
  myPagePhonNumber,
  myPageSelfProfile,
  myPageUserName,
  userLoginCheck,
} from "@/lib/recoil";
import supabase from "@/lib/supabase";
import { Field } from "@/types/enums";
import Image, { StaticImageData } from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import ProfileImage from "../Common/ProfileImage";
import Banner from "./Banner";
import color_fill from "../../public/icons/color_fill.svg";

/**
 * @TODO 업데이트 한 프로필을 서버에 반영합니다.
 */

const UserInfoContainer = () => {
  const [userName, setUserName] = useRecoilState(myPageUserName);
  const [contactEmail, setContactEmail] = useRecoilState(myPageContactEmail);
  const [selfProfile, setSelfProfile] = useRecoilState(myPageSelfProfile);
  const phone = useRecoilValue(myPagePhonNumber);
  const [userBackground, setUserBackground] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const getUserProfile = async () => {
    const { data: userProfile } = await supabase
      .from("user-profile")
      .select()
      .eq("id", "dbabf656-18e8-484d-aac9-e5065667a31a")
      .single();
    const {
      contact_email: contactEmailData,
      user_name: userNameData,
      self_profile: selfProfileData,
      background_color: backgroundColorData,
    } = userProfile;
    setUserName(userNameData);
    setContactEmail(contactEmailData);
    setSelfProfile(selfProfileData);
    setUserBackground(backgroundColorData);
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

  const onChangeBackgroundColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserBackground(e.target.value);
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
    background_color: userBackground,
    self_profile: selfProfile,
  };

  const handleIsEditing = async () => {
    // 갱신된 데이터 서버에 반영
    if (isEditing) {
      setIsEditing(false);
      const { error } = await supabase
        .from("user-profile")
        .update(userInfo)
        .eq("id", "dbabf656-18e8-484d-aac9-e5065667a31a");
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

  return (
    <InfoContainer>
      <Banner userBackground={userBackground} />
      <UserInfoWrapper>
        <ProfileImageWrapper>
          <ProfileImage alt="유저 프로필" page="myPage" />
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
`;

// isEditing true
const UserNameInput = styled.input`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
`;

const EmailInput = styled.input`
  color: gray;
  margin-bottom: 1.5rem;
  width: 100%;
`;

const SelfProfileInput = styled.textarea`
  padding: 1.25rem;
  font-size: 1rem;
  border: 1px solid lightgrey;
  width: 64rem;
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

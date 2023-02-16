import {
  myPageContactEmail,
  myPageSelfProfile,
  myPageUserName,
} from "@/lib/recoil";
import supabase from "@/lib/supabase";
import { UserProfileType } from "@/types";
import { Field } from "@/types/enums";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import ProfileImage from "../Common/ProfileImage";
import Banner from "./Banner";

/**
 * @TODO 업데이트 한 프로필을 서버에 반영합니다.
 */

const UserInfoContainer = () => {
  const [userName, setUserName] = useRecoilState(myPageUserName);
  const [contactEmail, setContactEmail] = useRecoilState(myPageContactEmail);
  const [selfProfile, setSelfProfile] = useRecoilState(myPageSelfProfile);

  const [isEditing, setIsEditing] = useState(false);

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
    phone: "01063058727",
    field: Field.WEB,
    skills: ["a", "b", "c"],
    career: "3년차",
    is_public: true,
    birth_year: 1997,
    self_profile: selfProfile,
  };

  const handleIsEditing = async () => {
    // 갱신된 데이터 서버에 반영
    if (isEditing) {
      setIsEditing(false);
      await supabase.from("user-profile").insert(userInfo);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <InfoContainer>
      <Banner />
      <UserInfoWrapper>
        <ProfileImageWrapper>
          <ProfileImage alt="유저 프로필" page="myPage" />
        </ProfileImageWrapper>
        <EditIconWrapper onClick={handleIsEditing}>
          <Image
            src="/icons/edit.svg"
            alt="편집 아이콘"
            width="24"
            height="24"
          />
        </EditIconWrapper>
        <TextWrapper>
          {isEditing ? (
            <>
              <UserNameInput value={userName} onChange={handleUserName} />
              <EmailInput value={contactEmail} onChange={handleContactEmail} />
              <SelfProfileInput
                value={selfProfile}
                onChange={handleSelfProfile}
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

const EditIconWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  right: 0rem;
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

export default UserInfoContainer;

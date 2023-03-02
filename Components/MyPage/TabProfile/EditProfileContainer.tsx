import { useUserProfile } from "@/hooks/query";
import {
  myPageBirthYear,
  myPageCareer,
  myPageField,
  myPageGender,
  myPageIsEditingProfileContainer,
  myPageIsPublic,
  myPagePhonNumber,
  myPageSkills,
} from "@/lib/recoil";
import checkIsPhoneNumber from "@/utils/commons/checkIsPhoneNumber";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { DefaultButton, Input, SkillList, Toggle } from "@/Components/Common";
import { useInput } from "@/hooks/common";
import PositionTag from "./PositionTag";
import ProfileContainer from "./ProfileContainer";
import { ContentContainer, ContentWrapper } from "./ShowProfileContainer";
import SwitchButton from "./SwitchButton";
import DropDown from "./DropDown";

/**
 * @TODO useInput 정상동작시키기
 */

const fieldList = [
  "웹",
  "앱",
  "보안",
  "소프트웨어",
  "데이터",
  "블록체인",
  "데브옵스",
  "IOT/임베디드",
];

const EditProfileContainer = () => {
  const setIsEditing = useSetRecoilState(myPageIsEditingProfileContainer);
  const { profileData, updateProfileData } = useUserProfile();

  const [phoneNumber, setPhoneNumber] = useRecoilState(myPagePhonNumber);
  const [isPublic, setIsPublic] = useRecoilState(myPageIsPublic);
  const [activeField, setActiveField] = useRecoilState(myPageField);
  const [editSkills, setEditSkills] = useRecoilState(myPageSkills);
  const [career, setCareer] = useRecoilState(myPageCareer);
  const [birthYear, setBirthYear] = useRecoilState(myPageBirthYear);
  const [gender, setGender] = useRecoilState(myPageGender);

  // local state로 편집 상태 제어
  const [isPhoneNumber, setIsPhoneNumber] = useState(false);
  const [isEmptyField, setIsEmptyField] = useState(false);
  const [isEmptySkills, setIsEmptySkills] = useState(false);

  const updateProfileLocalState = useCallback(async () => {
    setPhoneNumber(profileData.phone);
    setIsPublic(profileData.is_public);
    setActiveField(profileData.field);
    setEditSkills(profileData.skills);
    setCareer(profileData.career);
    setBirthYear(profileData.birth_year);
    setGender(profileData.gender);
  }, [profileData]);

  useEffect(() => {
    if (!profileData) {
      setPhoneNumber("01000000000");
      setIsPublic(true);
      setActiveField([]);
      setEditSkills([]);
      setCareer("신입");
      setBirthYear(new Date().getFullYear());
      setGender("선택안함");
    }
    updateProfileLocalState();
    // 의존성 배열은 없는게 맞습니다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { inputValues, handleInputChange } = useInput({
    userName: profileData.user_name ?? "",
    contactEmail: profileData.contact_email ?? "",
    selfProfile: profileData.self_profile ?? "",
    github: profileData.github ?? "",
  });

  if (!profileData) return <div>Error</div>;

  const clickField = (field: string) => {
    if (activeField?.includes(field)) {
      const newActiveField = activeField?.filter(
        (activeFieldItem) => activeFieldItem !== field
      );
      setActiveField(newActiveField);
    } else {
      setActiveField((prev) => (prev ? [...prev, field] : [field]));
    }
  };

  const handleEditPhoneNumber = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPhoneNumber(e.target.value);
    setIsPhoneNumber(checkIsPhoneNumber(e.target.value));
  };

  const handleSave = async () => {
    if (activeField.length === 0) {
      setIsEmptyField(true);
      setTimeout(() => {
        setIsEmptyField(false);
      }, 2000);
      return;
    }

    if (editSkills.length === 0) {
      setIsEmptySkills(true);
      setTimeout(() => {
        setIsEmptySkills(false);
      }, 2000);
      return;
    }
    setIsEditing(false);

    try {
      const newProfileData: UserProfileType = {
        ...profileData,
        phone: phoneNumber,
        field: activeField,
        skills: editSkills,
        // 캐시데이터 갱신
        birth_year: birthYear,
        gender,
        user_name: inputValues.userName,
        contact_email: inputValues.contactEmail,
        self_profile: inputValues.contactEmail,
        github: inputValues.github,
      };
      updateProfileData(newProfileData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TabProfileContainer>
      <ProfileContainer title="자기소개" rowGap={24}>
        <Input
          value={inputValues.selfProfile}
          onChange={handleInputChange("selfProfile")}
        />
      </ProfileContainer>
      <ProfileContainer title="기본 정보" rowGap={24}>
        <>
          <InfoWrapper>
            <ContentTitle>이름*</ContentTitle>
            <Input
              value={inputValues.userName}
              onChange={handleInputChange("userName")}
            />
          </InfoWrapper>

          <InfoWrapper>
            <ContentTitle>이메일*</ContentTitle>
            <Input
              value={inputValues.contactEmail}
              onChange={handleInputChange("contactEmail")}
            />
          </InfoWrapper>

          <InfoWrapper>
            <ContentTitle>성별</ContentTitle>
            <SwitchButton />
          </InfoWrapper>

          <InfoWrapper>
            <ContentTitle>출생년도</ContentTitle>
            <DropDown type="birth_year" />
          </InfoWrapper>

          <InfoWrapper>
            <ContentTitle>휴대전화</ContentTitle>
            <Input
              type="number"
              value={phoneNumber}
              onChange={handleEditPhoneNumber}
              placeholder="01012345678"
            />
            {isPhoneNumber && <span>전화번호 형식이 아닙니다.</span>}
          </InfoWrapper>
        </>
      </ProfileContainer>

      <ProfileContainer title="개발자 정보" rowGap={24}>
        <>
          <ContentWrapper>
            <ContentTitle>포지션</ContentTitle>
            <FieldWrapper>
              {fieldList.map((field) => (
                <PositionTag
                  onClick={() => clickField(field)}
                  key={field}
                  active={activeField?.includes(field)}
                >
                  {field}
                </PositionTag>
              ))}
              <FieldHelpText isEmptyField={isEmptyField}>
                필드를 선택해주세요.
              </FieldHelpText>
            </FieldWrapper>
          </ContentWrapper>
          <ContentWrapper>
            <ContentTitle>스킬</ContentTitle>
            <SkillList
              text="스킬 입력"
              editSkills={editSkills}
              setEditSkills={setEditSkills}
            />
          </ContentWrapper>
          <SkillHelpText isEmptySkills={isEmptySkills}>
            스킬을 입력해주세요. (예: React, Node.js, Python)
          </SkillHelpText>

          <InfoWrapper>
            <ContentTitle>깃허브 주소</ContentTitle>
            <Input
              value={inputValues.github}
              onChange={handleInputChange("github")}
              placeholder="https://github.com/user"
            />
          </InfoWrapper>
        </>
      </ProfileContainer>

      <ButtonWrapper>
        <DefaultButton
          text="취소"
          type="outline"
          size="m"
          onClick={() => setIsEditing(false)}
        />
        <DefaultButton
          text="저장"
          type="full"
          size="m"
          onClick={() => handleSave()}
        />
      </ButtonWrapper>
    </TabProfileContainer>
  );
};

const TabProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  align-items: center;
  height: 3.75rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: right;
`;

interface FieldHelpTextProps {
  isEmptyField: boolean;
}

const FieldHelpText = styled.span<FieldHelpTextProps>`
  color: red;
  font-size: 1rem;
  opacity: ${({ isEmptyField }) => (isEmptyField ? 1 : 0)};
  transition: opacity 0.5s;
`;

interface SkillHelpTextProps {
  isEmptySkills: boolean;
}

const SkillHelpText = styled.span<SkillHelpTextProps>`
  color: red;
  font-size: 1rem;
  margin-left: 8rem;
  opacity: ${({ isEmptySkills }) => (isEmptySkills ? 1 : 0)};
  transition: opacity 0.5s;
`;

const ContentTitle = styled.p`
  ${(props) => props.theme.fonts.body16}
  width: 11.5rem;
  color: ${(props) => props.theme.colors.gray3};
`;

export default EditProfileContainer;

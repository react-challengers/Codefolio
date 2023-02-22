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
import { DefaultButton, SkillList, Toggle } from "@/Components/Common";
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

  // const { inputValues, handleInputChange } = useInput({ phoneNumber: phone });
  // setIsPhoneNumber(checkIsPhoneNumber(inputValues.phoneNumber));

  const handleEditPhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
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
        is_public: isPublic,
        field: activeField,
        skills: editSkills,
        // 캐시데이터 갱신
        birth_year: birthYear,
        career,
        gender,
      };
      updateProfileData(newProfileData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TabProfileContainer>
        <ProfileContainer title="기본 정보">
          <>
            <InfoWrapper>
              <p>성별</p>
              <SwitchButton />
            </InfoWrapper>
            <InfoWrapper>
              <p>출생년도</p>
              <DropDown type="birth_year" />
            </InfoWrapper>
            <InfoWrapper>
              <p>휴대전화</p>
              <PhoneInput
                type="number"
                value={phoneNumber}
                onChange={handleEditPhoneNumber}
                // value={inputValues.phoneNumber}
                // onChange={handleInputChange("phoneNumber")}
                placeholder="01012345678"
              />
              {isPhoneNumber && <span>전화번호 형식이 아닙니다.</span>}
            </InfoWrapper>
          </>
        </ProfileContainer>
        <RightContainer>
          <ProfileContainer title="경력">
            <ContentContainer>
              <ContentWrapper>
                <p>포지션</p>
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
                <p>경력</p>
                <DropDown type="career" />
              </ContentWrapper>
              <ContentWrapper>
                <p>스킬</p>
                <SkillList
                  text="스킬 입력"
                  editSkills={editSkills}
                  setEditSkills={setEditSkills}
                />
              </ContentWrapper>
              <SkillHelpText isEmptySkills={isEmptySkills}>
                스킬을 입력해주세요. (예: React, Node.js, Python)
              </SkillHelpText>
            </ContentContainer>
          </ProfileContainer>

          <ProfileContainer>
            <ContentWrapper>
              <p>프로필 공개여부</p>
              <ToggleWrapper>
                <Toggle flicker={isPublic} setFlicker={setIsPublic} />
                <p>{isPublic ? "공개" : "비공개"}</p>
              </ToggleWrapper>
            </ContentWrapper>
          </ProfileContainer>
        </RightContainer>
      </TabProfileContainer>
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
    </>
  );
};

const TabProfileContainer = styled.div`
  width: 64rem;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-column-gap: 0.75rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;

  p {
    color: grey;
  }
`;

const RightContainer = styled.div`
  display: grid;
  grid-row-gap: 0.75rem;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 1rem 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: right;
`;

const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

const PhoneInput = styled.input`
  background-color: transparent;
  height: 3rem;
  border: 1px solid lightgrey;
  padding: 0 0.75rem;
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
export default EditProfileContainer;
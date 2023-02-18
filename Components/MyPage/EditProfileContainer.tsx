import {
  myPageField,
  myPageIsPublic,
  myPagePhonNumber,
  myPageSkills,
  myPageUserProfile,
} from "@/lib/recoil";
import supabase from "@/lib/supabase";
import checkIsPhoneNumber from "@/utils/commons/checkIsPhoneNumber";
import { ChangeEvent, Dispatch, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { DefaultButton, DropDown, SkillList, Toggle } from "../Common";
import PositionTag from "./PositionTag";
import ProfileContainer from "./ProfileContainer";
import { ContentContainer, ContentWrapper } from "./ShowProfileContainer";
import SwitchButton from "./SwitchButton";

/**
 * @TODO field, birthYear recoil state 연결
 * @TODO 서버에 데이터 저장
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

interface EditProfileContainerProps {
  setIsEditing: Dispatch<React.SetStateAction<boolean>>;
}

const EditProfileContainer = ({ setIsEditing }: EditProfileContainerProps) => {
  const [phoneNumber, setPhoneNumber] = useRecoilState(myPagePhonNumber);
  const [isPublic, setIsPublic] = useRecoilState(myPageIsPublic);
  const [activeField, setActiveField] = useRecoilState(myPageField);
  const [editSkills, setEditSkills] = useRecoilState(myPageSkills);
  const userProfile = useRecoilValue(myPageUserProfile);
  // local state로 편집 상태 제어
  const [isPhoneNumber, setIsPhoneNumber] = useState(false);

  const clickField = (field: string) => {
    if (activeField.includes(field)) {
      const newActiveField = activeField.filter(
        (activeFieldItem) => activeFieldItem !== field
      );
      setActiveField(newActiveField);
    } else {
      setActiveField([...activeField, field]);
    }
  };

  const handleEditPhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    setIsPhoneNumber(checkIsPhoneNumber(e.target.value));
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      await supabase
        .from("user-profile")
        .update(userProfile)
        .eq("user_id", userProfile.user_id);
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
                      active={activeField.includes(field)}
                    >
                      {field}
                    </PositionTag>
                  ))}
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

export default EditProfileContainer;

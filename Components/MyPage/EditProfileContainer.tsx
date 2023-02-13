import {
  getBirthYearsArray,
  getCareerYearsArray,
} from "@/utils/commons/getYearsArray";
import { ChangeEvent, Dispatch, useState } from "react";
import styled from "styled-components";
import DefaultButton from "../Common/DefaultButton";
import DropDown from "../Common/DropDown";
import Toggle from "../Common/Toggle";
import PositionTag from "./PositionTag";
import ProfileContainer from "./ProfileContainer";
import { ContentContainer, ContentWrapper } from "./ShowProfileContainer";
import SkillList from "./SkillList";
import SwitchButton from "./SwitchButton";

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
  userInfo: UserProfileType;
  setIsEditing: Dispatch<React.SetStateAction<boolean>>;
}

const EditProfileContainer = ({
  userInfo,
  setIsEditing,
}: EditProfileContainerProps) => {
  const birthYearsArray = getBirthYearsArray();
  const careerYearsArray = getCareerYearsArray();
  const {
    gender,
    birth_year,
    phone,
    field: oldField,
    skills,
    careerer,
    is_public,
  } = userInfo;
  const [activeField, setActiveField] = useState([...oldField]);
  const [editPhone, setEditPhone] = useState(phone);
  const [currentItem, setCurrentItem] = useState(gender);
  const [isPublic, setIsPublic] = useState(is_public);
  const [editSkills, setEditSkills] = useState(skills);

  type ChangeEditPhoneType = (e: ChangeEvent<HTMLInputElement>) => void;

  const changeEditPhone: ChangeEditPhoneType = (e) => {
    setEditPhone(e.target.value);
  };

  const clickField = (field: string) => {
    if (activeField.includes(field)) {
      const newActiveField = activeField.filter((af) => af !== field);
      setActiveField(newActiveField);
    } else {
      setActiveField([...activeField, field]);
    }
  };

  return (
    <>
      <TabProfileContainer>
        <ProfileContainer title="기본 정보">
          <>
            <InfoWrapper>
              <p>성별</p>
              <SwitchButton
                currentItem={currentItem}
                setCurrentItem={setCurrentItem}
              />
            </InfoWrapper>
            <InfoWrapper>
              <p>출생년도</p>
              <DropDown defaultValue={birth_year} options={birthYearsArray} />
            </InfoWrapper>
            <InfoWrapper>
              <p>휴대전화</p>
              <PhoneInput value={editPhone} onChange={changeEditPhone} />
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
                <DropDown defaultValue={careerer} options={careerYearsArray} />
              </ContentWrapper>
              <ContentWrapper>
                <p>스킬</p>
                <SkillList
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
          onClick={() => setIsEditing(false)}
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
  border: 0.0625rem solid lightgrey;
  padding: 0 0.75rem;
`;

export default EditProfileContainer;

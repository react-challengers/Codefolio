import { useRouter } from "next/router";
import { ChangeEvent, Dispatch, useState } from "react";
import styled from "styled-components";
import DefaultButton from "../Common/DefaultButton";
import Tags from "../Common/Tags";
import PositionTag from "./PositionTag";
import ProfileContainer from "./ProfileContainer";
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
  const router = useRouter();
  const { gender, birth_year, phone, field, skills, careerer } = userInfo;
  const [activeField, setActiveField] = useState([...field]);
  const [editPhone, setEditPhone] = useState(phone);
  const [currentItem, setCurrentItem] = useState(gender);

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
          <TextWrapper>
            <SwitchButton
              currentItem={currentItem}
              setCurrentItem={setCurrentItem}
            />
            <PhoneInput value={editPhone} onChange={changeEditPhone} />
          </TextWrapper>
        </ProfileContainer>
        <ProfileContainer title="경력">
          <ContentContainer>
            <TextWrapper>
              <p>포지션</p>
              <p>경력</p>
              <p>스킬</p>
            </TextWrapper>
            <TextWrapper>
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
              <p>3년</p>
              <Tags tagItems={skills} />
            </TextWrapper>
          </ContentContainer>
        </ProfileContainer>
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

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: right;
`;

const PhoneInput = styled.input`
  background-color: transparent;
  height: 3rem;
  border: 0.0625rem solid lightgrey;
  padding: 0 0.75rem;
`;

export default EditProfileContainer;

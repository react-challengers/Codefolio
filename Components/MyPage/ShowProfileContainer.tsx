import {
  myPageBirthYear,
  myPageCareer,
  myPageField,
  myPageGender,
  myPagePhonNumber,
  myPageSkills,
} from "@/lib/recoil";
import { Dispatch } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import DefaultButton from "../Common/DefaultButton";
import Tags from "../Common/Tags";
import ProfileContainer from "./ProfileContainer";

interface ShowProfileContainerProps {
  setIsEditing: Dispatch<React.SetStateAction<boolean>>;
}

const ShowProfileContainer = ({ setIsEditing }: ShowProfileContainerProps) => {
  const gender = useRecoilValue(myPageGender);
  const birthYear = useRecoilValue(myPageBirthYear);
  const phone = useRecoilValue(myPagePhonNumber);
  const field = useRecoilValue(myPageField);
  const skills = useRecoilValue(myPageSkills);
  const career = useRecoilValue(myPageCareer);

  return (
    <>
      <TabProfileContainer>
        <ProfileContainer title="기본 정보">
          <>
            <p>{gender}</p>
            <p>{`${birthYear} 년생`}</p>
            <p>{phone}</p>
          </>
        </ProfileContainer>

        <ProfileContainer title="경력">
          <ContentContainer>
            <ContentWrapper>
              <p>포지션</p> <Tags tagItems={field} />
            </ContentWrapper>
            <ContentWrapper>
              <p>경력</p>
              <p>{career}</p>
            </ContentWrapper>
            <ContentWrapper>
              <p>스킬</p> <Tags tagItems={skills} />
            </ContentWrapper>
          </ContentContainer>
        </ProfileContainer>
      </TabProfileContainer>

      <ButtonWrapper>
        <DefaultButton
          text="수정하기"
          type="full"
          size="m"
          onClick={() => setIsEditing(true)}
        />
      </ButtonWrapper>
    </>
  );
};

const TabProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-column-gap: 0.75rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;

  p {
    color: grey;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
  gap: 0.75rem;
`;

export default ShowProfileContainer;

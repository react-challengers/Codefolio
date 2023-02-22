import { useUserProfile } from "@/hooks/query";
import { myPageIsEditingProfileContainer } from "@/lib/recoil";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { DefaultButton, Tags } from "@/Components/Common";
import ProfileContainer from "./ProfileContainer";

const ShowProfileContainer = () => {
  const setIsEditing = useSetRecoilState(myPageIsEditingProfileContainer);

  const { profileData } = useUserProfile();

  if (!profileData) return <div>Error</div>;

  return (
    <>
      <TabProfileContainer>
        <ProfileContainer title="기본 정보">
          <>
            <p>{profileData.gender}</p>
            {profileData.birth_year !== new Date().getFullYear() && (
              <p>{`${profileData.birth_year} 년생`}</p>
            )}
            {profileData.phone !== "01000000000" && <p>{profileData.phone}</p>}
          </>
        </ProfileContainer>

        <ProfileContainer title="경력">
          <ContentContainer>
            <ContentWrapper>
              <p>포지션</p>
              <Tags tagItems={profileData?.field} />
            </ContentWrapper>
            <ContentWrapper>
              <p>경력</p>
              <p>{profileData?.career}</p>
            </ContentWrapper>
            <ContentWrapper>
              <p>스킬</p>
              <Tags tagItems={profileData?.skills} />
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

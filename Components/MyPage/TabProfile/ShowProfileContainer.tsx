import { useUserProfile } from "@/hooks/query";
import { myPageIsEditingProfileContainer } from "@/lib/recoil";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { PrimaryButton, Tags } from "@/Components/Common";
import { useRouter } from "next/router";
import ProfileContainer from "./ProfileContainer";

const ShowProfileContainer = () => {
  const setIsEditing = useSetRecoilState(myPageIsEditingProfileContainer);
  const router = useRouter();

  // 옵셔널 체이닝으로 존재하지 않는 프로필은 본인으로 리다이렉팅
  const profileUserId = router?.query?.userId?.[0];
  const { profileData } = useUserProfile(profileUserId);
  const { profileData: selfProfileData } = useUserProfile();

  if (!profileData) return <div>Error</div>;

  return (
    <TabProfileContainer>
      <ProfileContainer title="자기소개">
        <SelfProfileContainer>{profileData.self_profile}</SelfProfileContainer>
      </ProfileContainer>

      <ProfileContainer title="기본정보">
        <ContentContainer>
          <ContentWrapper>
            <ContentTitle>이름*</ContentTitle>
            <ContentItem>{profileData.user_name}</ContentItem>
          </ContentWrapper>
          <ContentWrapper>
            <ContentTitle>이메일*</ContentTitle>
            <ContentItem>{profileData.contact_email}</ContentItem>
          </ContentWrapper>
          <ContentWrapper>
            <ContentTitle>성별</ContentTitle>
            {profileData.gender === "선택안함" ? (
              <ContentEmpty>선택안함</ContentEmpty>
            ) : (
              <ContentItem>{profileData.gender}</ContentItem>
            )}
          </ContentWrapper>
          <ContentWrapper>
            <ContentTitle>출생년도</ContentTitle>
            {profileData.birth_year === new Date().getFullYear() ? (
              <ContentEmpty>선택안함</ContentEmpty>
            ) : (
              <ContentItem>{profileData.birth_year}</ContentItem>
            )}
          </ContentWrapper>
          <ContentWrapper>
            <ContentTitle>휴대폰번호</ContentTitle>
            {profileData.phone === "01000000000" ? (
              <ContentEmpty>비어있음</ContentEmpty>
            ) : (
              <ContentItem>{profileData.phone}</ContentItem>
            )}
          </ContentWrapper>
        </ContentContainer>
      </ProfileContainer>

      <ProfileContainer title="개발자 정보">
        <ContentContainer>
          <ContentWrapper>
            <ContentTitle>포지션</ContentTitle>
            <Tags tagItems={profileData?.field} color="white" />
          </ContentWrapper>
          <ContentWrapper>
            <ContentTitle>기술스택</ContentTitle>
            <Tags tagItems={profileData?.skills} />
          </ContentWrapper>
          <ContentWrapper>
            <ContentTitle>깃허브 주소</ContentTitle>
            {profileData.github === "" ? (
              <ContentEmpty>비어있음</ContentEmpty>
            ) : (
              <ContentItem>{profileData.github}</ContentItem>
            )}
          </ContentWrapper>
        </ContentContainer>
      </ProfileContainer>

      <ButtonWrapper>
        {selfProfileData.user_id === profileUserId || !profileUserId ? (
          <PrimaryButton
            text="수정하기"
            buttonType="default"
            size="m"
            onClick={() => setIsEditing(true)}
          />
        ) : null}
      </ButtonWrapper>
    </TabProfileContainer>
  );
};

const TabProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SelfProfileContainer = styled.div`
  ${(props) => props.theme.fonts.body16}
  color: ${(props) => props.theme.colors.white};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ContentTitle = styled.p`
  ${(props) => props.theme.fonts.body16}
  width: 11.5rem;
  color: ${(props) => props.theme.colors.gray3};
`;

const ContentItem = styled.div`
  ${(props) => props.theme.fonts.subtitle16}
  color: ${(props) => props.theme.colors.white};
`;

const ContentEmpty = styled.div`
  ${(props) => props.theme.fonts.subtitle16}
  color: ${(props) => props.theme.colors.gray5};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
  gap: 0.75rem;
`;

export default ShowProfileContainer;

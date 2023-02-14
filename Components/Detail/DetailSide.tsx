import styled from "styled-components";
import ProfileImage from "../Common/ProfileImage";
import Tags from "../Common/Tags";
import DefaultBox from "./DetailBox";
import DetailSideContainer from "./DetailSideContainer";
import DetailWith from "./DetailWith";

const DetailSide = () => {
  const date = 2;
  const skills = ["Front-end", "Android"];
  const tag = ["#Components", "#API"];

  return (
    <SideContainer>
      <DetailSideContainer>
        <div>
          <Title>프로젝트 기간</Title>
          <Description>{date}개월</Description>
        </div>

        <DetailSideWrapper>
          <Title>개발스택</Title>
          <Tags tagItems={skills} />
        </DetailSideWrapper>

        <DetailSideWrapper>
          <Title>키워드 태그</Title>
          <Tags tagItems={tag} />
        </DetailSideWrapper>
      </DetailSideContainer>

      <DetailSideContainer>
        <DetailSideWrapper>
          <Title>작성자</Title>
          <ProfileWrapper>
            <ProfileImage
              src="/images/anonProfile.jpeg"
              alt="프로필 사진"
              page="detailPage"
            />
            <Name>허다은</Name>
          </ProfileWrapper>
          <ButtonsWrapper>
            {skills.map((skill) => (
              <DefaultBox key={skill}>{skill}</DefaultBox>
            ))}
          </ButtonsWrapper>
        </DetailSideWrapper>

        <DetailSideWrapper>
          <Title>함께한 사람들</Title>
          <DetailWith
            name="윤준호"
            field="Front-end"
            github="https://github.com/yunjunhojj"
          />
          <DetailWith
            name="윤준호"
            field="Front-end"
            github="https://github.com/yunjunhojj"
          />
          <DetailWith
            name="윤준호"
            field="Front-end"
            github="https://github.com/yunjunhojj"
          />
        </DetailSideWrapper>
      </DetailSideContainer>
    </SideContainer>
  );
};

const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const DetailSideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.span`
  font-size: 0.8125rem;
  color: #666666;
`;
const Description = styled.span`
  margin-left: 2rem;
  font-size: 0.8125rem;
  color: #b3b3b3;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.25rem;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

const Name = styled.p`
  font-size: 1.125rem;
`;

export default DetailSide;

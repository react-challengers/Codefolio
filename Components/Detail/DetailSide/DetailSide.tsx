import supabase from "@/lib/supabase";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ProfileImage, Tags } from "@/Components/Common";
import DefaultBox from "./DetailBox";
import DetailSideContainer from "./DetailSideContainer";
import DetailWith from "./DetailWith";

interface DetailSideProps {
  progressDate: string[];
  subCategory: string;
  tag: string[];
  skills: string[];
  members: string[];
  userId: string;
}

const DetailSide = ({
  progressDate,
  subCategory,
  tag,
  skills,
  members,
  userId,
}: DetailSideProps) => {
  const [author, setAuthor] = useState("");
  const [authorProfileImage, setAuthorProfileImage] = useState("");

  const getAuthor = async () => {
    const { data, error } = await supabase
      .from("user_profile")
      .select()
      .eq("user_id", userId)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    setAuthor(data?.user_name);
    setAuthorProfileImage(data?.profile_image);
  };

  useEffect(() => {
    if (!userId) return;
    getAuthor();
  }, [userId]);

  return (
    <SideContainer>
      <DetailSideContainer>
        <div>
          <Title>프로젝트 기간</Title>
          <Description>
            {progressDate[0]} ~ {progressDate[1]}
          </Description>
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
              src={authorProfileImage}
              alt="프로필 사진"
              page="detailPage"
            />
            <Name>{author}</Name>
          </ProfileWrapper>
          <ButtonsWrapper>
            <DefaultBox>{subCategory}</DefaultBox>
          </ButtonsWrapper>
        </DetailSideWrapper>

        <DetailSideWrapper>
          {members.length !== 0 && <Title>함께한 사람들</Title>}
          {members.map(
            (
              // 에러 어떻게 해결하죠....
              { name, field, github }: any,
              idx
            ) => (
              <DetailWith key={idx} name={name} field={field} github={github} />
            )
          )}
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

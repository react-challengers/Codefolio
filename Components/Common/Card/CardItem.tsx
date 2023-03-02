import { useCheckInteraction } from "@/hooks/query";
import supabase from "@/lib/supabase";
import Image from "next/image";
import { useMemo, useState } from "react";
import styled from "styled-components";
import ProfileImage from "../ProfileImage";
import IconWithCount from "./IconWithCount";

/**
 * 여기는 CardItem에 해당하는 컴포넌트입니다.
 * @TODO comment icon이 추가로 나오면 IconCount에 대입하는 props를 수정합니다.
 * @TODO post에서 pick and omit로 타입 조합하기
 * @TODO Image Hover에 작성자 프로필 보여주기
 */

interface CardProps {
  postId: string;
  imageSrc: string;
  imageAlt: string;
  skills: string[];
  title: string;
  subTitle: string;
  date: string;
  likes: number;
  comments: number;
  bookmarks: number;
  field: string;
  userId: string;
}

/**
 * @param {string} imageSrc - 이미지 url가 보이는 url
 * @param {string} imageAlt - 이미지 alt 텍스트
 * @param {string[]} skills - 스택 목록
 * @param {string} title - 게시글 제목
 * @param {string} subTitle - 게시글 설명
 * @param {string} date - 게시글 게시일
 * @param {string} likes - 좋아요 수
 * @param {string} comments - 댓글 수
 * @param {string} bookmarks - 북마크 수
 * @param {string} filed - 분야
 * @param {string} user_id - 작성자 id
 * @constructor
 * @example
 * <CardItem
 *    imageSrc="OK-LGTM.png"
 *    imageAlt="Test"
 *    skills={["Components", "API"]}
 *    title="React Profiler API로 컴포넌트 측정하기"
 *    subTitle="조금씩 추상화하면서 설계하기"
 *    date="2023.02.10"
 *    likes={203}
 *    comments={57}
 *    field="WEB"
 * />
 */

const CardItem = ({
  postId,
  skills,
  imageSrc,
  imageAlt,
  title,
  subTitle,
  date,
  likes,
  comments,
  bookmarks,
  field,
  userId,
}: CardProps) => {
  const [isOverlay, setIsOverlay] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);
  const { isLike, isBookmark, isComment } = useCheckInteraction(postId);

  useMemo(() => {
    const getUserInfo = async () => {
      const { data } = await supabase
        .from("user_profile")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (!data) setUserName("sns계정");
      else {
        setUserName(data.user_name || null);
        setUserProfileImage(data.profile_image || null);
      }
    };

    getUserInfo();
  }, [userId]);

  return (
    <CardContainer
      onMouseEnter={() => {
        setIsOverlay(true);
      }}
      onMouseLeave={() => {
        setIsOverlay(false);
      }}
    >
      <ImageContainer>
        {isOverlay && (
          <ImageOverlayContainer>
            <ImageOverlayProfileContainer>
              <ProfileImage
                src={userProfileImage}
                alt="프로필 사진"
                page="detailPage"
              />
              <ImageOverlayProfileName>{userName}</ImageOverlayProfileName>
            </ImageOverlayProfileContainer>
          </ImageOverlayContainer>
        )}
        <OverlayCategory>{field}</OverlayCategory>
        <CardImage
          src={`${imageSrc}`}
          alt={imageAlt}
          unoptimized
          width={300}
          height={180}
        />
      </ImageContainer>
      <CardBottomWrapper>
        <DateCountContainer>
          <Date>{date}</Date>
          <IconCountContainer>
            <IconWithCount
              icon={`like${isLike ? "Hover" : ""}`}
              count={likes}
            />
            <IconWithCount
              icon={`bookmark${isBookmark ? "Hover" : ""}`}
              count={bookmarks}
            />
            <IconWithCount
              icon={`comment${isComment ? "Hover" : ""}`}
              count={comments}
            />
          </IconCountContainer>
        </DateCountContainer>
        <TitleWrapper>
          <Title>{title}</Title>
          <SubTitle>{subTitle}</SubTitle>
        </TitleWrapper>
        {/* <Tags skills={skills} size="sm" /> */}
        <TagWrapper>
          {skills.map((tag, idx) => {
            if (idx < 3) {
              return <Tag key={tag}>{tag}</Tag>;
            }
            if (idx === 3) {
              return <Tag key={tag}>+{skills.length - 3}</Tag>;
            }
            return null;
          })}
        </TagWrapper>
      </CardBottomWrapper>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  width: 18.75rem;
`;

const ImageContainer = styled.div`
  width: 18.75rem;
  height: 11.25rem;
  position: relative;
  margin: 0 0 0.75rem 0;
  cursor: pointer;

  ul {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    z-index: 1;
  }
`;

const CardImage = styled(Image)`
  object-fit: cover;
  border-radius: 0.5rem;
`;

const ImageOverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  border-radius: 0.5rem;
`;

const ImageOverlayProfileContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  z-index: 1;
  display: flex;
  align-items: center;
  color: #fff;
`;

const ImageOverlayProfileName = styled.span`
  margin-left: 0.5rem;
  ${({ theme }) => theme.fonts.subtitle16};
  color: ${({ theme }) => theme.colors.gray3};
`;

const CardBottomWrapper = styled.div`
  padding: 0 0.5rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  height: 8.2rem;
  overflow: hidden;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.h2`
  ${({ theme }) => theme.fonts.subtitle16};
  color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SubTitle = styled.h3`
  ${({ theme }) => theme.fonts.body12};
  text-align: left;
  color: ${({ theme }) => theme.colors.gray4};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DateCountContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray4};
`;

const Date = styled.div`
  ${({ theme }) => theme.fonts.body13En};
  padding-top: 0.125rem;
`;

const IconCountContainer = styled.div`
  display: flex;
`;

const OverlayCategory = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.25rem 0.5rem;

  position: absolute;
  left: 0.625rem;
  top: 0.625rem;

  height: 1.375rem;
  border-radius: 0.6875rem;
  background-color: ${({ theme }) => theme.colors.gray8};
  color: ${({ theme }) => theme.colors.gray1};

  ${({ theme }) => theme.fonts.body13En};
`;

const Tag = styled.div`
  ${({ theme }) => theme.fonts.body13En};
  color: ${({ theme }) => theme.colors.primary6};
  background-color: ${({ theme }) => theme.colors.gray8};

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.25rem 0.5rem;
  height: 1.375rem;
  border-radius: 0.25rem;
`;

const TagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.375rem;
  overflow-y: hidden;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default CardItem;

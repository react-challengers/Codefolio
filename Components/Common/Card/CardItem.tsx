import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import ProfileImage from "../ProfileImage";
import Tags from "../Tags";
import IconWithCount from "./IconWithCount";

/**
 * 여기는 CardItem에 해당하는 컴포넌트입니다.
 * @TODO comment icon이 추가로 나오면 IconCount에 대입하는 props를 수정합니다.
 * @TODO post에서 pick and omit로 타입 조합하기
 * @TODO Image Hover에 작성자 프로필 보여주기
 */

type Field =
  | "WEB"
  | "APP"
  | "SOFTWARE"
  | "DATA"
  | "WEB3"
  | "DEVOPS"
  | "IOT_AND_EMBEDDED"
  | "SECURITY";

interface CardProps {
  imageSrc: string;
  imageAlt: string;
  linkURL: string;
  tagItems: string[];
  title: string;
  subTitle: string;
  date: string;
  likes: number;
  comments: number;
  field: Field;
}

/**
 * @param {string} imageSrc - 이미지 url가 보이는 url
 * @param {string} imageAlt - 이미지 alt 텍스트
 * @param {string} linkURL - 클릭하면 연결 Detail 페이지로 이동합니다.
 * @param {string[]} tagItems - 태그 목록
 * @param {string} title - 게시글 제목
 * @param {string} subTitle - 게시글 설명
 * @param {string} date - 게시글 게시일
 * @param {string} likes - 좋아요 수
 * @param {string} comments - 댓글 수
 * @param {string} filed - 분야
 * @constructor
 * @example
 * <CardItem
 *    imageSrc="OK-LGTM.png"
 *    imageAlt="Test"
 *    tagItems={["Components", "API"]}
 *    title="React Profiler API로 컴포넌트 측정하기"
 *    subTitle="조금씩 추상화하면서 설계하기"
 *    date="2023.02.10"
 *    likes={203}
 *    comments={57}
 *    field="WEB"
 *    linkURL={`/detail/${1}`}
 * />
 */

const CardItem = ({
  tagItems,
  imageSrc,
  linkURL,
  imageAlt,
  title,
  subTitle,
  date,
  likes,
  comments,
  field,
}: CardProps) => {
  return (
    <CardContainer>
      <Link href={linkURL}>
        <ImageContainer>
          <Tags tagItems={[field]} size="sm" />
          <Image src={`/images/${imageSrc}`} alt={imageAlt} layout="fill" />
          <ProfileImage alt={title} page="myPage" />
        </ImageContainer>
      </Link>
      <CardBottomWrapper>
        <DateCountContainer>
          <Date>{date}</Date>
          <IconCountContainer>
            <IconWithCount icon="ico-heart" count={likes} />
            <IconWithCount icon="ico-heart" count={comments} />
          </IconCountContainer>
        </DateCountContainer>
        <TitleWrapper>
          <Title>{title}</Title>
          <SubTitle>{subTitle}</SubTitle>
        </TitleWrapper>
        <Tags tagItems={tagItems} size="sm" />
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

  img {
    object-fit: cover;
    border-radius: 0.5rem;
  }
`;

const CardBottomWrapper = styled.div`
  padding: 0 0.5rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SubTitle = styled.h3`
  font-size: 0.8125rem;
  font-weight: 400;
  text-align: left;
  color: #b3b3b3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DateCountContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #b3b3b3;
`;

const Date = styled.div`
  font-weight: 400;
  font-size: 0.75rem;
`;

const IconCountContainer = styled.div`
  display: flex;
`;

export default CardItem;

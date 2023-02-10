import Image from "next/image";
import styled from "styled-components";
import Tags from "../Tags";
import IconCount from "./IconCount";

/**
 * 여기는 CardItem에 해당하는 컴포넌트입니다.
 * @TODO comment icon이 나오면 props를 수정합니다.
 * @TODO post에서 pick and omit로 타입 조합하기
 */

interface CardProps {
  src: string;
  alt: string;
  tagItems: string[];
  title: string;
  subTitle: string;
  date: string;
  likes: number;
  comments: number;
}

const Card = ({
  tagItems,
  src,
  alt,
  title,
  subTitle,
  date,
  likes,
  comments,
}: CardProps) => {
  return (
    <CardContainer>
      <ImageContainer>
        <Image
          src={`/images/${src}`}
          alt={alt}
          layout="fill"
          sizes="300"
          style={{ objectFit: "cover" }}
        />
      </ImageContainer>
      <DateCountContainer>
        <Date>{date}</Date>
        <IconCountContainer>
          <IconCount icon="ico-heart" count={likes} />
          <IconCount icon="ico-heart" count={comments} />
        </IconCountContainer>
      </DateCountContainer>
      <Title>{title}</Title>
      <SubTitle>{subTitle}</SubTitle>
      <Tags tagItems={tagItems} />
    </CardContainer>
  );
};

const CardContainer = styled.div`
  width: 18.75rem;
  height: 19.125rem;
`;

const ImageContainer = styled.div`
  width: 18.75rem;
  height: 11.25rem;
  object-fit: cover;
  position: relative;
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 500;
`;

const SubTitle = styled.h3`
  //styleName: Body/Body-13;
  font-size: 0.8125rem;
  font-weight: 400;
  text-align: left;
  color: #b3b3b3;
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
  font-size: 12px;
`;

const IconCountContainer = styled.div`
  display: flex;
`;

export default Card;

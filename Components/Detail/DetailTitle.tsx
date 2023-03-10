import Image from "next/image";
import styled from "styled-components";

interface DetailTitleProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  subCategory: string;
}

const DetailTitle = ({
  title,
  subtitle,
  backgroundImage,
  subCategory,
}: DetailTitleProps) => {
  return (
    <DetailTitleContainer>
      {backgroundImage && (
        <DetailTitleBackgroundImage
          src={backgroundImage}
          width={1400}
          height={262}
          alt="커버 이미지"
        />
      )}
      <DetailTitleHeader>{subCategory}</DetailTitleHeader>
      <DetailTitleText>
        <h1>{title}</h1>
        <h3>{subtitle}</h3>
      </DetailTitleText>
    </DetailTitleContainer>
  );
};

const DetailTitleContainer = styled.div`
  width: 100%;
  height: 16rem;
  padding: 1.5rem 8.75rem 2.5rem 8.75rem;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    height: 14rem;
    padding-left: 2rem;
  }
`;

const DetailTitleBackgroundImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: auto;
  opacity: 0.8;

  @media (max-width: 768px) {
    height: 13.5rem;
  }
`;

const DetailTitleHeader = styled.p`
  ${({ theme }) => theme.fonts.subtitle18En};
  color: ${(props) => props.theme.colors.white};
  z-index: 1;
`;

const DetailTitleText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  h1 {
    ${({ theme }) => theme.fonts.title36};
    color: ${(props) => props.theme.colors.white};
  }
  h3 {
    ${({ theme }) => theme.fonts.subtitle18};
    color: ${(props) => props.theme.colors.white};
  }
  z-index: 1;

  @media (max-width: 768px) {
    width: auto;

    h1 {
      ${({ theme }) => theme.fonts.title24};
    }
    h3 {
      ${({ theme }) => theme.fonts.body14};
    }
  }
`;

export default DetailTitle;

import styled from "styled-components";

interface DetailTitleProps {
  title: string;
  subtitle: string;
  field: string;
  subCategory: string;
}

const DetailTitle = ({
  title,
  subtitle,
  field,
  subCategory,
}: DetailTitleProps) => {
  return (
    <DetailTitleContainer>
      <DetailTitleHeader>
        {field} {">"} {subCategory}
      </DetailTitleHeader>
      <DetailTitleText>
        <h1>{title}</h1>
        <h3>{subtitle}</h3>
      </DetailTitleText>
    </DetailTitleContainer>
  );
};

const DetailTitleContainer = styled.div`
  width: 100%;
  height: 16.25rem;
  padding: 1.5rem 8.75rem 2.5rem 8.75rem;
  background-color: #e6e6e6;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DetailTitleHeader = styled.p`
  color: #b3b3b3;
`;

const DetailTitleText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: #262626;
  }
  h3 {
    font-size: 1.25rem;
    color: #999999;
  }
`;

export default DetailTitle;

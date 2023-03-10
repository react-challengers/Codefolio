import styled from "styled-components";

const EmptyCategory = () => {
  return (
    <EmptyCategoryContainer>
      <EmptyText>아직 작성된 글이 없습니다.</EmptyText>
    </EmptyCategoryContainer>
  );
};

const EmptyCategoryContainer = styled.div`
  width: 78.75rem;
  min-height: 65rem;
`;

const EmptyText = styled.div`
  width: 66vw;
  display: flex;
  justify-content: center;
  ${({ theme }) => theme.fonts.title24}
  color: ${({ theme }) => theme.colors.gray4};
  margin-top: 3rem;
`;

export default EmptyCategory;

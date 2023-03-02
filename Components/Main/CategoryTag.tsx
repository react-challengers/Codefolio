import Image from "next/image";
import styled from "styled-components";

interface CategoryTagProps {
  category: string;
  deleteHandler: (category: string) => void;
}

const CategoryTag = ({ category, deleteHandler }: CategoryTagProps) => {
  return (
    <CategoryTagContainer>
      <CategoryItem>{category}</CategoryItem>
      <CategoryDeleteButton
        src="/icons/close.svg"
        alt="close"
        width={24}
        height={24}
        onClick={() => deleteHandler(category)}
      />
    </CategoryTagContainer>
  );
};

const CategoryTagContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.375rem 1rem;
  border-radius: 0.5rem;

  background-color: ${({ theme }) => theme.colors.gray7};
  color: ${({ theme }) => theme.colors.primary6};
  ${({ theme }) => theme.fonts.subtitle18En};
`;

const CategoryItem = styled.p`
  margin-right: 0.75rem;
`;

const CategoryDeleteButton = styled(Image)`
  cursor: pointer;
`;

export default CategoryTag;

import Image from "next/image";
import React from "react";
import styled from "styled-components";
import bottom_arrow from "@/public/icons/bottom_arrow.svg";

interface LargeCategoryProps {
  item: string;
  selectedCategory: string[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string[]>>;
}

const LargeCategoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 2rem;
  margin-bottom: 1rem;

  &:hover {
    cursor: pointer;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const LargeCategoryItem = styled.span`
  font-size: 1.25rem;
`;

const LargeCategory = ({
  item,
  selectedCategory,
  setSelectedCategory,
}: LargeCategoryProps) => {
  const onClickLargeCategory = () => {
    const largeCategory = item;

    if (selectedCategory.includes(largeCategory)) {
      setSelectedCategory(
        selectedCategory.filter((category) => category !== largeCategory)
      );
      return;
    }
    setSelectedCategory((prev) => [...prev, largeCategory]);
  };
  return (
    <LargeCategoryContainer onClick={() => onClickLargeCategory()}>
      <LargeCategoryItem>{item}</LargeCategoryItem>
      <Image src={bottom_arrow} alt="bottom_arrow" width={32} height={32} />
    </LargeCategoryContainer>
  );
};

export default LargeCategory;

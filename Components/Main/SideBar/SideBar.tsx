import styled from "styled-components";
import check from "@/public/icons/check.svg";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { largeCategoryState, subCategoryState } from "@/lib/recoil";

interface SubCategoryItemsType {
  [key: string]: string[];
}

const SideBar = () => {
  const [selectedCategory, setSelectedCategory] =
    useRecoilState(largeCategoryState);
  const [selectedSubCategory, setSelectedSubCategory] =
    useRecoilState(subCategoryState);

  const largeCategoryItems = ["웹", "앱", "인공지능", "데이터"];

  const subCategoryItems: SubCategoryItemsType = {
    웹: ["Full-stack", "Front-end", "Back-end"],
    앱: ["Android", "iOS", "Flutter", "React Native"],
    인공지능: ["AI"],
    데이터: ["Big data"],
  };

  const onClickAllCategory = () => {
    setSelectedCategory([]);
    setSelectedSubCategory([]);
  };

  const onClickSubCategory = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const subCategory = target.innerText;

    if (selectedSubCategory.includes(subCategory)) {
      setSelectedSubCategory(
        selectedSubCategory.filter((item) => item !== subCategory)
      );
      return;
    }
    setSelectedSubCategory((prev) => [...prev, subCategory]);
  };

  return (
    <SideBarContainer>
      <SideBarTitle
        onClick={onClickAllCategory}
        isSelected={!!selectedSubCategory.length}
      >
        전체
      </SideBarTitle>
      <CategoryContainer>
        {largeCategoryItems.map((item: string) => (
          <li key={item}>
            {/* <LargeCategory
              item={item}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            /> */}
            <SideBarHr />

            <SubCategoryItemsContainer>
              {subCategoryItems[item].map((subItem) =>
                selectedSubCategory.includes(subItem) ? (
                  <SubCategoryContainer
                    key={subItem}
                    selected={selectedSubCategory.includes(subItem)}
                  >
                    <SubCategoryItem
                      onClick={(e) => onClickSubCategory(e)}
                      selected={selectedSubCategory.includes(subItem)}
                    >
                      {subItem}
                    </SubCategoryItem>
                    <Image
                      src={check}
                      alt="check"
                      width={24}
                      height={24}
                      hidden={!selectedSubCategory.includes(subItem)}
                    />
                  </SubCategoryContainer>
                ) : (
                  <SubCategoryContainer key={subItem} selected={false}>
                    <SubCategoryItem
                      onClick={(e) => onClickSubCategory(e)}
                      selected={false}
                    >
                      {subItem}
                    </SubCategoryItem>
                  </SubCategoryContainer>
                )
              )}
            </SubCategoryItemsContainer>
          </li>
        ))}
      </CategoryContainer>
    </SideBarContainer>
  );
};

const SideBarContainer = styled.aside`
  display: flex;
  flex-direction: column;
  min-width: 18.75rem;
  height: auto;
  padding: 3.5rem 1.5rem;
`;

interface SideBarTitleProps {
  isSelected: boolean;
}

const SideBarTitle = styled.span<SideBarTitleProps>`
  ${({ theme }) => theme.fonts.title24}
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.gray4 : theme.colors.white};
  margin-left: 1rem;
  cursor: pointer;
`;

const SideBarHr = styled.hr`
  width: 100%;
  height: 1px;
  border: none;
  background-color: ${({ theme }) => theme.colors.gray7};
  margin: 1.5rem 0;
`;

const CategoryContainer = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
`;

const SubCategoryItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
`;

interface SubCategoryItemProps {
  selected: boolean;
}

const SubCategoryContainer = styled.div<SubCategoryItemProps>`
  display: flex;
  align-items: center;
  height: 2.75rem;
  padding: 0 1rem;

  ${({ selected, theme }) =>
    selected &&
    `
    background-color: ${theme.colors.gray7};
    color: ${theme.colors.gray2};
  `}

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray7};
    color: ${({ theme }) => theme.colors.gray2};
  }
`;

interface SubCategoryItemProps {
  selected: boolean;
}

const SubCategoryItem = styled.div<SubCategoryItemProps>`
  ${({ theme }) => theme.fonts.subtitle18En};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.gray2 : theme.colors.gray4};
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;

  margin: 0.625rem 0;

  cursor: pointer;
`;

export default SideBar;

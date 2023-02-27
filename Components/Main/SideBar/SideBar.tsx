import styled from "styled-components";
import check from "@/public/icons/check.svg";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { largeCategoryState, subCategoryState } from "@/lib/recoil";
import LargeCategory from "./LargeCategory";

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

  const onClickAllCatecory = () => {
    setSelectedCategory([]);
    setSelectedSubCategory([]);
  };

  const onClickSubCategory = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
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
      <SideBarTitle onClick={onClickAllCatecory}>전체</SideBarTitle>
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
                    onClick={(e) => onClickSubCategory(e)}
                    selected={selectedSubCategory.includes(subItem)}
                  >
                    <SubCategoryItem>{subItem}</SubCategoryItem>
                    <Image
                      src={check}
                      alt="check"
                      width={24}
                      height={24}
                      hidden={!selectedSubCategory.includes(subItem)}
                    />
                  </SubCategoryContainer>
                ) : (
                  <SubCategoryContainer
                    key={subItem}
                    onClick={(e) => onClickSubCategory(e)}
                    selected={false}
                  >
                    <SubCategoryItem>{subItem}</SubCategoryItem>
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
  width: 18.75rem;
  height: auto;
  padding: 3.5rem 2.5rem 3.5rem 1.5rem;
`;

const SideBarTitle = styled.span`
  font-size: 1.5rem;
  cursor: pointer;
`;

const SideBarHr = styled.hr`
  width: 100%;
  height: 1px;
  border: none;
  background-color: #ccc;
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
  justify-content: space-between;
  height: 2.75rem;
  padding: 0.625rem 0.625rem 0.625rem 1rem;

  ${({ selected }) =>
    selected &&
    `
    background-color: #f2f2f2;
    font-weight: 500;
  `}

  &:hover {
    cursor: pointer;
    background-color: #f2f2f2;
  }
`;

const SubCategoryItem = styled.span`
  font-size: 1rem;
`;

export default SideBar;

import styled from "styled-components";
import check from "@/public/icons/check.svg";
import Image from "next/image";
import LargeCategory from "./LargeCategory";
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

  const largeCategoryItems = [
    "Web",
    "App",
    "Software",
    "Data",
    "Web3",
    "DevOps",
    "IOT&Embedded",
    "Security",
  ];

  const subCategoryItems: SubCategoryItemsType = {
    Web: ["Front-End", "Back-End", "Full-Stack"],
    App: ["iOS", "Android", "Flutter", "React Native"],
    Software: ["사무자동화", "공장자동화", "ERP", "유니티", "언리얼"],
    Data: ["데이터 엔지니어", "머신러닝 엔지니어", "데이터 사이언스"],
    Web3: ["기타"],
    DevOps: ["기타"],
    "IOT&Embedded": ["기타"],
    Security: ["기타"],
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
      <SideBarTitle>전체</SideBarTitle>
      <SideBarHr />
      <CategoryContainer>
        {largeCategoryItems.map((item: string) => (
          <>
            <LargeCategory
              item={item}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <SubCategoryItemsContainer>
              {selectedCategory.includes(item) &&
                subCategoryItems[item].map((subItem) =>
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
          </>
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
`;

const SideBarHr = styled.hr`
  width: 100%;
  height: 1px;
  border: none;
  background-color: #ccc;
  margin: 1.5rem 0;
`;

const CategoryContainer = styled.div`
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

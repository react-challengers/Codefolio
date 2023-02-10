import { largeCategoryState, subCategoryState } from "@/lib/recoil";
import Image from "next/image";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import bottom_arrow from "@/public/icons/bottom_arrow.svg";
import Tags from "../Common/Tags";
import CardItem from "../Common/Card/CardItem";

const HomeMainContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin-left: 1.5rem;
  margin-top: 3rem;
`;

const HomeCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  width: 100%;
  margin-top: 1rem;
`;

const HomeDropDownContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const HomeDropDownButton = styled.div`
  display: flex;
  align-items: center;
  width: 5rem;

  &:hover {
    cursor: pointer;
  }
`;

const HomeDropDownList = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 11rem;
  width: 7rem;
  background-color: white;
  border: 1px solid #e1e4e8;
  border-radius: 0.25rem;
  font-size: 1rem;
  gap: 0.5rem;
  z-index: 1;
`;

const HomeDropDownItemContainer = styled.div`
  &:hover {
    cursor: pointer;
    background-color: #f6f8fa;
  }
`;

const HomeDropDownItem = styled.li`
  margin: 0.5rem;
`;
const MainSection = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const homeDropDownItems = ["최신순", "조회순", "추천순"];
  const [selectedDropDownItem, setSelectedDropDownItem] = useState(
    homeDropDownItems[0]
  );
  const selectedLargeCategory = useRecoilValue(largeCategoryState);
  const selectedSubCategory = useRecoilValue(subCategoryState);

  const onClickDropDown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  return (
    <HomeMainContainer>
      {selectedLargeCategory.length !== 0 &&
        selectedSubCategory.length !== 0 && (
          <Tags
            tagItems={[
              `${selectedLargeCategory} | ${selectedSubCategory.map(
                (item) => item
              )}`,
            ]}
            size="lg"
          />
        )}
      {selectedLargeCategory.length !== 0 &&
        selectedSubCategory.length === 0 &&
        selectedLargeCategory.map((item) => (
          <Tags key={item} tagItems={[`${item}`]} size="lg" />
        ))}
      <HomeDropDownContainer>
        <HomeDropDownButton
          onClick={() => {
            onClickDropDown();
          }}
        >
          {selectedDropDownItem}
          <Image src={bottom_arrow} alt="bottom_arrow" width={32} height={32} />
        </HomeDropDownButton>
        {isDropDownOpen && (
          <HomeDropDownList>
            {homeDropDownItems.map((item) => (
              <HomeDropDownItemContainer
                key={item}
                onClick={() => {
                  setSelectedDropDownItem(item);
                  setIsDropDownOpen(false);
                }}
              >
                <HomeDropDownItem>{item}</HomeDropDownItem>
              </HomeDropDownItemContainer>
            ))}
          </HomeDropDownList>
        )}
      </HomeDropDownContainer>
      <HomeCardGrid>
        <CardItem
          imageSrc="anonImage.png"
          imageAlt="ㅁ"
          linkURL="google.com"
          title="안드로이드 스튜디오에서 빌드가 안될때"
          subTitle="안드로이드 스튜디오에서 빌드가 안될때"
          tagItems={["App | Android, iOS, flutter"]}
          date="2021.08.01"
          comments={100}
          likes={100}
          field="APP"
        />
      </HomeCardGrid>
    </HomeMainContainer>
  );
};

export default MainSection;

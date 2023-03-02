import styled from "styled-components";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  postLargeCategory,
  postProjectDuration,
  // postPublic,
  postSkills,
  postSubCategory,
  postTags,
} from "@/lib/recoil";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import getYYYYMM from "@/utils/commons/getYYYYMM";
import { SkillList } from "@/Components/Common";
// import { SkillList, Toggle } from "@/Components/Common";
import arrow_down from "@/public/icons/arrow_down.svg";
import Image from "next/image";
import FieldDropDown from "./FieldDropDown";
import WithPeople from "./WithPeople";

const ProjectInfoDropDown = () => {
  const [postSkill, setPostSkill] = useRecoilState(postSkills);
  const [[startDate, endDate], setDate] = useRecoilState(postProjectDuration);
  const [tag, setTag] = useRecoilState(postTags);
  // const [isPublic, setIsPublic] = useRecoilState(postPublic);
  const largeCategory = useRecoilValue(postLargeCategory);
  const subCategory = useRecoilValue(postSubCategory);

  const [categoryVisible, setCategoryVisible] = useState(false);

  const handleShowCategory = () => {
    setCategoryVisible((prev) => !prev);
  };

  return (
    <ProjectInfoDropDownContainer>
      <ProjectInfoContainer>
        <ProjectInfoWrapper>
          <TEXTBOX>카테고리*</TEXTBOX>
          <CategoryPicker onClick={handleShowCategory}>
            {largeCategory && subCategory ? (
              <span>{subCategory}</span>
            ) : (
              <span>카테고리를 선택해주세요.</span>
            )}
            <DropdownImage
              src={arrow_down}
              alt="category selete icon"
              width={16}
              height={16}
            />
            {categoryVisible && <FieldDropDown />}
          </CategoryPicker>
        </ProjectInfoWrapper>

        <ProjectInfoWrapper>
          <TEXTBOX>프로젝트 스택*</TEXTBOX>
          <SkillList
            text="개발 스택 추가"
            editSkills={postSkill}
            setEditSkills={setPostSkill}
          />
        </ProjectInfoWrapper>

        <ProjectInfoWrapper>
          <TEXTBOX>프로젝트 기간*</TEXTBOX>
          <DatePickerContainer>
            <StyledDatePicker
              showMonthYearPicker
              selected={new Date(startDate)}
              dateFormat="yyyy-MM"
              onChange={(date: Date) =>
                setDate((prev) => [getYYYYMM(date), prev[1]])
              }
              selectsStart
              startDate={new Date(startDate)}
              endDate={new Date(endDate)}
              maxDate={new Date(endDate)}
            />
            <SpaceBetweenDatePicker> ~ </SpaceBetweenDatePicker>
            <StyledDatePicker
              showMonthYearPicker
              selected={new Date(endDate)}
              dateFormat="yyyy-MM"
              onChange={(date: Date) =>
                setDate((prev) => [prev[0], getYYYYMM(date)])
              }
              selectsEnd
              startDate={new Date(startDate)}
              endDate={new Date(endDate)}
              minDate={new Date(startDate)}
            />
          </DatePickerContainer>
        </ProjectInfoWrapper>

        <ProjectInfoWrapper>
          <TEXTBOX>깃허브 주소</TEXTBOX>
          <InputURL placeholder="https://github.com/project" />
        </ProjectInfoWrapper>

        <ProjectInfoWrapper>
          <TEXTBOX>배포 주소</TEXTBOX>
          <InputURL placeholder="https://example.com" />
        </ProjectInfoWrapper>

        <ProjectInfoWrapper>
          <TEXTBOX>키워드 태그</TEXTBOX>
          <SkillList text="태그 추가" editSkills={tag} setEditSkills={setTag} />
        </ProjectInfoWrapper>

        <ProjectInfoWrapper>
          <TEXTBOX>함께한 사람들</TEXTBOX>
          <WithPeople />
        </ProjectInfoWrapper>

        {/* <ProjectInfoWrapper>
          <TEXTBOX>게시물 공개</TEXTBOX>
          <ToggleWrapper>
            <Toggle flicker={isPublic} setFlicker={setIsPublic} />
            <p>{isPublic ? "공개" : "비공개"}</p>
          </ToggleWrapper>
        </ProjectInfoWrapper> */}
      </ProjectInfoContainer>
    </ProjectInfoDropDownContainer>
  );
};

const ProjectInfoDropDownContainer = styled.div`
  height: auto;
  min-height: 200px;

  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.gray7};
  border-top: none;

  padding: 40px 72px;
`;

const ProjectInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  width: 990px;
`;

const ProjectInfoWrapper = styled.div`
  display: flex;
  gap: 60px;
`;

const CategoryPicker = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 100%;
  cursor: pointer;

  border-bottom: 0.0625rem solid;
  border-color: ${({ theme }) => theme.colors.gray7};

  ${({ theme }) => theme.fonts.body14Medium};

  span {
    color: ${({ theme }) => theme.colors.white};
    display: flex;
    padding: 0.625rem 1rem;
  }
`;

const DropdownImage = styled(Image)`
  margin: 0.75rem;
`;

const DatePickerContainer = styled.div`
  display: flex;
  height: 80px;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 125px;

  border: none;
  border-bottom: 0.0625rem solid;

  display: flex;
  justify-content: center;
  text-align: center;
`;

const InputURL = styled.input`
  width: 100%;
  height: 100%;
  padding: 0.625rem 1rem;

  background-color: transparent;
  border: none;
  border-bottom: 0.0625rem solid;
  border-color: ${({ theme }) => theme.colors.gray7};

  ${({ theme }) => theme.fonts.body14};
  color: ${({ theme }) => theme.colors.white};
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray6};
  }
`;

// const ToggleWrapper = styled.div`
//   display: flex;
//   gap: 12px;
//   align-items: center;
//   p {
//     color: #999999;
//     font-size: 13px;
//   }
// `;

const SpaceBetweenDatePicker = styled.div`
  margin: 0 15px 0 15px;
`;

const TEXTBOX = styled.div`
  min-width: 7.5rem;
  min-height: 5rem;
  padding: 0.625rem 0;

  color: ${({ theme }) => theme.colors.gray3};
  ${({ theme }) => theme.fonts.body16};
`;

export default ProjectInfoDropDown;

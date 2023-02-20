import styled from "styled-components";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  postLargeCategory,
  postProjectDuration,
  postPublic,
  postSkills,
  postSubCategory,
  postTags,
} from "@/lib/recoil";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import getYYYYMM from "@/utils/commons/getYYYYMM";
import FieldDropDown from "./FieldDropDown";
import SkillList from "../Common/Skill/SkillList";
import Toggle from "../Common/Toggle";
import WithPeople from "./WithPeople";
import Tags from "../Common/Tags";

const ProjectInfoDropDown = () => {
  const [postSkill, setPostSkill] = useRecoilState(postSkills);
  const [[startDate, endDate], setDate] = useRecoilState(postProjectDuration);
  const [tag, setTag] = useRecoilState(postTags);
  const [isPublic, setIsPublic] = useRecoilState(postPublic);
  const largeCategory = useRecoilValue(postLargeCategory);
  const subCategory = useRecoilValue(postSubCategory);

  const [categoryVisible, setCategoryVisible] = useState(false);

  const handleShowCategory = () => {
    setCategoryVisible((prev) => !prev);
  };

  return (
    <ProjectInfoDropDownContainer>
      <ProjectInfoContainer>
        <CategoryContainer>
          <TEXTBOX>카테고리</TEXTBOX>
          {largeCategory && subCategory ? (
            <Tags tagItems={[`${largeCategory} > ${subCategory}`]} size="md" />
          ) : (
            <CategoryPicker onClick={handleShowCategory}>
              카테고리를 선택해주세요.
              {categoryVisible && <FieldDropDown />}
            </CategoryPicker>
          )}
        </CategoryContainer>
        <DevelopStackContainer>
          <TEXTBOX>개발 스택</TEXTBOX>
          <SkillList
            text="개발 스택 추가"
            editSkills={postSkill}
            setEditSkills={setPostSkill}
          />
        </DevelopStackContainer>
        <Container>
          <TEXTBOX>프로젝트 기간</TEXTBOX>
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
        </Container>
      </ProjectInfoContainer>
      <ProjectInfoContainer>
        <ProjectInfoWrapper>
          <TEXTBOX>함께한 사람들</TEXTBOX>
          <WithPeople />
        </ProjectInfoWrapper>
        <ProjectInfoWrapper>
          <TEXTBOX>키워드 태그</TEXTBOX>
          <SkillList text="태그 추가" editSkills={tag} setEditSkills={setTag} />
        </ProjectInfoWrapper>
        <ProjectInfoWrapper>
          <TEXTBOX>게시물 공개</TEXTBOX>
          <ToggleWrapper>
            <Toggle flicker={isPublic} setFlicker={setIsPublic} />
            <p>{isPublic ? "공개" : "비공개"}</p>
          </ToggleWrapper>
        </ProjectInfoWrapper>
      </ProjectInfoContainer>
    </ProjectInfoDropDownContainer>
  );
};

const ProjectInfoDropDownContainer = styled.div`
  height: auto;
  min-height: 12.5rem;

  margin-top: 0.125rem;
  border: 1px solid #cccccc;
  padding: 1.25rem 0;

  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const ProjectInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProjectInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
`;

const CategoryContainer = styled.div`
  display: flex;
`;

const CategoryPicker = styled.div`
  position: relative;
`;

const DevelopStackContainer = styled.div`
  display: flex;
`;
const Container = styled.div`
  display: flex;
`;

const DatePickerContainer = styled.div`
  display: flex;
`;

const ToggleWrapper = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  p {
    color: #999999;
    font-size: 0.8125rem;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  width: 7.8125rem;

  border: none;
  border-bottom: 1px solid;

  display: flex;
  justify-content: center;
  text-align: center;
`;

const SpaceBetweenDatePicker = styled.div`
  margin: 0 0.9375rem 0 0.9375rem;
`;

const TEXTBOX = styled.div`
  display: flex;
  align-items: center;

  width: 6.25rem;
  margin-left: 3.125rem;

  font-size: 0.8125rem;
`;

export default ProjectInfoDropDown;

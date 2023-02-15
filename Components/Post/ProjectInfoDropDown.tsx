import styled from "styled-components";
import { Dispatch, SetStateAction, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import FieldDropDown from "./FieldDropDown";
import SkillList from "../Common/Skill/SkillList";
import Toggle from "../Common/Toggle";
import WithPeople, { WithPersonType } from "./WithPeople";

/**
 * @see https://www.youtube.com/shorts/4hpjO2onpNs
 * @TODO 월 선택 안됨 (z-index)
 */

interface ProjectInfoDropDownProps {
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  endDate: Date;
  setEndDate: Dispatch<SetStateAction<Date>>;
  techStack: string[];
  setTechStack: Dispatch<SetStateAction<string[]>>;
  tag: string[];
  setTag: Dispatch<SetStateAction<string[]>>;
  isPublic: boolean;
  setIsPublic: Dispatch<SetStateAction<boolean>>;
  people: WithPersonType[];
  setPeople: Dispatch<SetStateAction<WithPersonType[]>>;
}

const ProjectInfoDropDown = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  techStack,
  setTechStack,
  tag,
  setTag,
  isPublic,
  setIsPublic,
  people,
  setPeople,
}: ProjectInfoDropDownProps) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  const handleOnPush = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTechStack((prev) => [...prev, inputValue]);
      setInputValue("");
    }
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const [categoryVisible, setCategoryVisible] = useState(false);

  const handleShowCategory = () => {
    setCategoryVisible((prev) => !prev);
  };

  return (
    <ProjectInfoDropDownContainer>
      <ProjectInfoContainer>
        <CategoryContainer>
          <TEXTBOX>카테고리</TEXTBOX>
          <CategoryPicker onClick={handleShowCategory}>
            카테고리를 선택해주세요.
            {categoryVisible && (
              <FieldDropDown setSelectedItem={setSelectedItem} />
            )}
          </CategoryPicker>
        </CategoryContainer>
        <DevelopStackContainer>
          <TEXTBOX>개발 스택</TEXTBOX>
          <SkillList
            text="개발 스택 추가"
            editSkills={techStack}
            setEditSkills={setTechStack}
          />
        </DevelopStackContainer>
        <Container>
          <TEXTBOX>프로젝트 기간</TEXTBOX>
          <DatePickerContainer>
            <StyledDatePicker
              showMonthYearPicker
              selected={startDate}
              dateFormat="yyyy-MM"
              onChange={(date: Date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
            <SpaceBetweenDatePicker> ~ </SpaceBetweenDatePicker>
            <StyledDatePicker
              showMonthYearPicker
              selected={endDate}
              dateFormat="yyyy-MM"
              onChange={(date: Date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </DatePickerContainer>
        </Container>
      </ProjectInfoContainer>
      <ProjectInfoContainer>
        <ProjectInfoWrapper>
          <TEXTBOX>함께한 사람들</TEXTBOX>
          <WithPeople people={people} setPeople={setPeople} />
        </ProjectInfoWrapper>
        <ProjectInfoWrapper>
          <TEXTBOX>키워드 태그</TEXTBOX>
          <SkillList text="태그 추가" editSkills={tag} setEditSkills={setTag} />
        </ProjectInfoWrapper>
        <ProjectInfoWrapper>
          <TEXTBOX>게시물 공개</TEXTBOX>
          <ToggleWrapper>
            <Toggle flicker={isPublic} setFlicker={setIsPublic} />
            <p>비공개</p>
          </ToggleWrapper>
        </ProjectInfoWrapper>
      </ProjectInfoContainer>
    </ProjectInfoDropDownContainer>
  );
};

const ProjectInfoDropDownContainer = styled.div`
  height: 12.5rem;

  margin-top: 2px;
  border: 1px solid #cccccc;

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
  gap: 12px;
  align-items: center;
  p {
    color: #999999;
    font-size: 13px;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  width: 7.8125rem;

  border: none;
  border-bottom: 1px solid;

  display: flex;
  justify-content: center;
  text-align: center;
  z-index: 10000;
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

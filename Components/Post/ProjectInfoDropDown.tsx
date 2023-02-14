import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Tags from "../Common/Tags";

/**
 * @see https://www.youtube.com/shorts/4hpjO2onpNs
 * @TODO 월 선택 안됨. 준호님 질문
 */

interface ProjectInfoDropDownProps {
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  endDate: Date;
  setEndDate: Dispatch<SetStateAction<Date>>;
  techStackInput: string[];
  setTechStackInput: Dispatch<SetStateAction<string[]>>;
}
const ProjectInfoDropDown = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  techStackInput,
  setTechStackInput,
}: ProjectInfoDropDownProps) => {
  const handleOnChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTechStackInput((prev) => [...prev, e.currentTarget.value]);
    }
  };

  return (
    <ProjectInfoDropDownContainer>
      <CategoryContainer>
        <TEXTBOX>카테고리</TEXTBOX>
        {/* input으로 받아줄 state 생성 */}
        <CategoryPicker>카테고리를 선택해주세요.</CategoryPicker>
      </CategoryContainer>
      <DevelopStackContainer>
        <TEXTBOX>개발 스택</TEXTBOX>
        {/* input으로 받아 Tags로 전달 */}
        <Tags tagItems={techStackInput} />
        <input
          type="text"
          value={""}
          onKeyDown={handleOnChange}
          // ={handleOnChange}
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
    </ProjectInfoDropDownContainer>
  );
};

const ProjectInfoDropDownContainer = styled.div`
  width: 98.75rem;
  height: 12.5rem;

  margin-top: 2px;
  border: 1px solid #cccccc;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const CategoryContainer = styled.div`
  display: flex;
`;

const CategoryPicker = styled.div``;

const DevelopStackContainer = styled.div`
  display: flex;
`;
const Container = styled.div`
  display: flex;
`;

const DatePickerContainer = styled.div`
  display: flex;
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

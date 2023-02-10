import styled from "styled-components";
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";

import Tag from "./Tag";
import DatePicker from "react-datepicker";

const ProjectInfoDropDown = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  return (
    <ProjectInfoDropDownContainer>
      <CategoryContainer>
        <TEXTBOX>카테고리</TEXTBOX>
        <CategoryPicker>카테고리를 선택해주세요.</CategoryPicker>
      </CategoryContainer>
      <DevelopStackContainer>
        <TEXTBOX>개발 스택</TEXTBOX>
        <Tag>Toast UI</Tag>
        <Tag>Toast UI</Tag>
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
  border: 0.0625rem solid #cccccc;

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

  border: 0rem;
  border-bottom: 0.0625rem solid;

  display: flex;
  justify-content: center;
  text-align: center;
`;

const SpaceBetweenDatePicker = styled.div`
  margin: 0rem 0.9375rem 0rem 0.9375rem;
`;

const TEXTBOX = styled.div`
  display: flex;
  align-items: center;

  width: 6.25rem;
  margin-left: 3.125rem;

  font-size: 0.8125rem;
`;

export default ProjectInfoDropDown;

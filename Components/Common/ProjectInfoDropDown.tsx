import styled from "styled-components";
import { useState, useEffect } from "react";

import Tag from "./Tag";
import DatePicker from "react-datepicker";

const ProjectInfoDropDown = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <ProjectInfoDropDownContainer>
      <CategoryContainer>
        <TEXTBOX>카테고리</TEXTBOX>
        <CategoryPicker>카테고리를 선택해주세요.</CategoryPicker>
      </CategoryContainer>
      <DevelopStackContainer>
        <TEXTBOX>개발 스택</TEXTBOX>
        <Tag>Toast UI</Tag>
      </DevelopStackContainer>
      <Container>
        <TEXTBOX>프로젝트 기간</TEXTBOX>
        <DatePicker
          selected={startDate}
          dateFormat="yyyy-MM-dd"
          onChange={(date) => setStartDate(date!)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <DatePicker
          selected={endDate}
          dateFormat="yyyy-MM-dd"
          onChange={(date) => setEndDate(date!)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </Container>
    </ProjectInfoDropDownContainer>
  );
};

const ProjectInfoDropDownContainer = styled.div`
  width: 1580px;
  height: 200px;

  margin-top: 0.125rem;
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

const DataContainer = styled.div`
  display: flex;
`;

const TEXTBOX = styled.div`
  display: flex;
  align-items: center;

  width: 100px;
  margin-left: 50px;

  font-size: 13px;
`;

export default ProjectInfoDropDown;

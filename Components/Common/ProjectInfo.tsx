import Image from "next/image";
import styled from "styled-components";
import { useState } from "react";
import ProjectInfoDropDown from "./ProjectInfoDropDown";
import arrow_down from "@/public/images/arrow_down.jpg";

const ProjectInfo = () => {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div>
      <DropdownContainer>
        <ProjectInfoTitle>프로젝트 정보</ProjectInfoTitle>
        <DropdownButton onClick={() => setOpenDropdown(!openDropdown)}>
          <DropdownImage src={arrow_down} alt="dropdown image" />
        </DropdownButton>
      </DropdownContainer>
      {openDropdown ? <ProjectInfoDropDown></ProjectInfoDropDown> : null}
    </div>
  );
};

const DropdownContainer = styled.div`
  width: 1580px;
  height: 58.51px;

  border: 1px solid #cccccc;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProjectInfoTitle = styled.div`
  margin: 17.75px auto 17.75px 50px;

  font-size: 16px;
`;

const DropdownButton = styled.button`
  border: 0px;

  margin-right: 40px;
  background-color: white;

  /* margin-right: 41.12px; */
`;

const DropdownImage = styled(Image)`
  border-radius: 50%;
`;
export default ProjectInfo;

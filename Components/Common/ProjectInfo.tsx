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
        <DropdownButton onClick={() => setOpenDropdown((prev) => !prev)}>
          <DropdownImage src={arrow_down} alt="dropdown image" />
        </DropdownButton>
      </DropdownContainer>
      {openDropdown && <ProjectInfoDropDown></ProjectInfoDropDown>}
    </div>
  );
};

const DropdownContainer = styled.div`
  width: 98.75rem;
  height: 3.6569rem;

  border: 1px solid #cccccc;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProjectInfoTitle = styled.div`
  margin: 1.1094rem auto 1.1094rem 3.125rem;

  font-size: 1rem;
`;

const DropdownButton = styled.button`
  border: none;
  margin-right: 2.5rem;
  background-color: white;
`;

const DropdownImage = styled(Image)`
  border-radius: 50%;
`;
export default ProjectInfo;

import Image from "next/image";
import styled from "styled-components";
import { useState } from "react";
import arrow_down from "@/public/icons/arrow_down.svg";
import ProjectInfoDropDown from "./ProjectInfoDropDown";

const ProjectInfo = () => {
  const [openDropdown, setOpenDropdown] = useState(true);

  return (
    <ProjectInfoContainer>
      <DropdownContainer>
        <ProjectInfoTitle>프로젝트 정보</ProjectInfoTitle>
        <DropdownButton onClick={() => setOpenDropdown((prev) => !prev)}>
          <DropdownImage src={arrow_down} alt="dropdown image" />
        </DropdownButton>
      </DropdownContainer>
      {openDropdown && <ProjectInfoDropDown />}
    </ProjectInfoContainer>
  );
};

const ProjectInfoContainer = styled.div`
  margin: 0.5rem 0;
`;

const DropdownContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1.5rem 4.5rem;

  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.gray7};
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
`;

const ProjectInfoTitle = styled.div`
  ${({ theme }) => theme.fonts.subtitle18Bold};
  color: ${({ theme }) => theme.colors.gray1};
`;

const DropdownButton = styled.button`
  all: unset;
  cursor: pointer;
`;

const DropdownImage = styled(Image)`
  border-radius: 50%;
`;
export default ProjectInfo;

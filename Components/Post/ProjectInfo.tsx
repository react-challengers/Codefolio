import Image from "next/image";
import styled from "styled-components";
import { Dispatch, SetStateAction, useState } from "react";
import arrow_down from "@/public/images/arrow_down.jpg";
import ProjectInfoDropDown from "./ProjectInfoDropDown";

interface ProjectInfoDropDownProps {
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  endDate: Date;
  setEndDate: Dispatch<SetStateAction<Date>>;
  techStack: string[];
  setTechStack: Dispatch<SetStateAction<string[]>>;
}

const ProjectInfo = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  techStack,
  setTechStack,
}: ProjectInfoDropDownProps) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div>
      <DropdownContainer>
        <ProjectInfoTitle>프로젝트 정보</ProjectInfoTitle>
        <DropdownButton onClick={() => setOpenDropdown((prev) => !prev)}>
          <DropdownImage src={arrow_down} alt="dropdown image" />
        </DropdownButton>
      </DropdownContainer>
      {openDropdown && (
        <ProjectInfoDropDown
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          techStack={techStack}
          setTechStack={setTechStack}
        />
      )}
    </div>
  );
};

const DropdownContainer = styled.div`
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

import Image from "next/image";
import { ChangeEvent, Dispatch } from "react";
import styled from "styled-components";

interface SkillProps {
  skill: string;
  idx: number;
  onDelete: (idx: number) => void;
  setEditSkills: Dispatch<React.SetStateAction<string[]>>;
}

const Skill = ({ skill, idx, onDelete, setEditSkills }: SkillProps) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditSkills((prevSkill) => {
      const newSkill = [...prevSkill];
      newSkill[idx] = e.target.value;
      return newSkill;
    });
  };

  return (
    <SkillContainer>
      <SkillInput value={skill} onChange={onChange} />
      <CancelButton
        onClick={() => onDelete(idx)}
        src="/icons/cancel.svg"
        alt="취소 버튼"
        width="8"
        height="8"
      />
    </SkillContainer>
  );
};

export const commonStyle = {
  "background-color": "grey",
  color: "white",
  "border-radius": "50px",
  height: "2.125rem",
  border: "none",
  padding: "0 0.75rem",
  outline: "none",
};

const SkillContainer = styled.label`
  ${commonStyle}
`;

const SkillInput = styled.input`
  ${commonStyle}
  width:80px;
`;

const CancelButton = styled(Image)`
  cursor: pointer;
  padding: 2px;
`;

export default Skill;

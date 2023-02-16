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
        width="12"
        height="12"
      />
    </SkillContainer>
  );
};

export const commonStyle = {
  "background-color": "grey",
  color: "white",
  "border-radius": "3.125rem",
  height: "2.125rem",
  border: "none",
  padding: "0 0.75rem",
  outline: "none",
};

const SkillContainer = styled.label`
  ${commonStyle}
  display:flex;
  align-items: center;
`;

const SkillInput = styled.input`
  ${commonStyle}
  width:5rem;
`;

const CancelButton = styled(Image)`
  cursor: pointer;
  padding: 0.125rem;
`;

export default Skill;

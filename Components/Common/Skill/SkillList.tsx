import { Dispatch } from "react";
import styled from "styled-components";
import Skill, { commonStyle } from "./Skill";

interface SkillPickerProps {
  text: string;
  editSkills: string[];
  setEditSkills: Dispatch<React.SetStateAction<string[]>>;
  maxLangth?: number;
}

const SkillList = ({
  text,
  editSkills,
  setEditSkills,
  maxLangth,
}: SkillPickerProps) => {
  const addSkill = () => {
    if (maxLangth && editSkills.length >= maxLangth) return null;
    if (!editSkills) return setEditSkills([""]);
    if (!editSkills.includes("")) setEditSkills([...editSkills, ""]);
    return null;
  };

  const onDelete = (idx: number) => {
    const newEditSkills = editSkills.filter((_, i) => i !== idx);
    setEditSkills(newEditSkills);
  };

  return (
    <SkillListContainer>
      {editSkills?.map((skill, idx) => (
        <Skill
          key={idx}
          skill={skill}
          editSkills={editSkills}
          setEditSkills={setEditSkills}
          addSkill={addSkill}
          idx={idx}
          onDelete={onDelete}
          isLast={idx === editSkills.length - 1}
        />
      ))}
      <SkillButton onClick={addSkill}>+ {text}</SkillButton>
    </SkillListContainer>
  );
};

const SkillListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1.75rem;

  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.gray7};
  border-radius: 0.25rem;
`;

const SkillButton = styled.button`
  ${commonStyle}
  cursor: pointer;
  background: transparent;
  color: ${({ theme }) => theme.colors.gray6};
  ${({ theme }) => theme.fonts.body14};
`;

export default SkillList;

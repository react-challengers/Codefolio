import { Dispatch } from "react";
import styled from "styled-components";
import Skill, { commonStyle } from "./Skill";

interface SkillPickerProps {
  editSkills: string[];
  setEditSkills: Dispatch<React.SetStateAction<string[]>>;
}

const SkillList = ({ editSkills, setEditSkills }: SkillPickerProps) => {
  const addSkill = () => {
    if (editSkills[editSkills.length - 1] !== "")
      setEditSkills([...editSkills, ""]);
  };

  const onDelete = (idx: number) => {
    const newEditSkills = editSkills.filter((_, i) => i !== idx);
    setEditSkills(newEditSkills);
  };

  return (
    <SkillListContainer>
      {editSkills.map((skill, idx) => (
        <Skill
          key={idx}
          skill={skill}
          setEditSkills={setEditSkills}
          idx={idx}
          onDelete={onDelete}
        />
      ))}
      <SkillButton onClick={addSkill}>+ 스킬 입력</SkillButton>
    </SkillListContainer>
  );
};

const SkillListContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const SkillButton = styled.button`
  ${commonStyle}
  cursor: pointer;
`;

export default SkillList;

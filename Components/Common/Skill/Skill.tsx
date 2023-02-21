import Image from "next/image";
import { ChangeEvent, Dispatch, useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface SkillProps {
  skill: string;
  idx: number;
  onDelete: (idx: number) => void;
  editSkills: string[];
  setEditSkills: Dispatch<React.SetStateAction<string[]>>;
  addSkill: () => void;
  isLast: boolean;
}

const Skill = ({
  skill,
  idx,
  onDelete,
  setEditSkills,
  editSkills,
  addSkill,
  isLast,
}: SkillProps) => {
  const lastSkillRef = useRef<HTMLInputElement>(null);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (editSkills.includes(e.target.value)) {
      setIsDuplicate(true);
    }
    if (!editSkills.includes(e.target.value)) {
      setIsDuplicate(false);
    }
    setEditSkills((prevSkill) => {
      const newSkill = [...prevSkill];
      newSkill[idx] = e.target.value;
      return newSkill;
    });
  };

  const handelOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addSkill();
    }
  };

  useEffect(() => {
    if (isLast && lastSkillRef.current) {
      lastSkillRef.current.focus();
    }
  }, [isLast, lastSkillRef]);

  return (
    <SkillContainer>
      <SkillInput
        value={skill}
        onChange={onChange}
        maxLength={15}
        isDuplicate={isDuplicate}
        onKeyDown={handelOnKeyDown}
        ref={isLast ? lastSkillRef : null}
      />
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

interface SkillInputProps {
  isDuplicate?: boolean;
}

const SkillInput = styled.input`
  ${commonStyle}
  width:5rem;
  ${({ isDuplicate }: SkillInputProps) => ({
    color: isDuplicate ? "orange" : "white",
    textDecoration: isDuplicate ? "line-through" : "none",
    fontWeight: isDuplicate ? "bold" : "normal",
  })}
  padding: 0 0.5rem;
`;

const CancelButton = styled(Image)`
  cursor: pointer;
  padding: 0.125rem;
`;

export default Skill;

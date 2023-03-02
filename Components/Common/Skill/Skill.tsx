import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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

  const checkDuplicate = useCallback(
    (value: string) => {
      const checkDuplicateItem =
        editSkills.filter((skillItem) => skillItem === value).length > 1;
      setIsDuplicate(checkDuplicateItem);
    },
    [editSkills]
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditSkills((prevSkill) => {
      const newSkill = [...prevSkill];
      newSkill[idx] = e.target.value;
      return newSkill;
    });
    checkDuplicate(e.target.value);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.nativeEvent.isComposing === false) {
      addSkill();
    }
  };

  useEffect(() => {
    if (isLast && lastSkillRef.current) {
      lastSkillRef.current.focus();
    }
  }, [isLast, lastSkillRef]);

  useEffect(() => {
    checkDuplicate(skill);
  }, [skill, editSkills, checkDuplicate]);

  return (
    <SkillContainer>
      <SkillInput
        value={skill}
        onChange={onChange}
        maxLength={15}
        isDuplicate={isDuplicate}
        onKeyPress={handleOnKeyDown}
        ref={isLast ? lastSkillRef : null}
      />
      <CancelButton
        onClick={() => onDelete(idx)}
        src="/icons/cancel.svg"
        alt="취소 버튼"
        width="16"
        height="16"
      />
    </SkillContainer>
  );
};

export const commonStyle = {
  border: "none",
  outline: "none",
  borderRadius: "0.25rem",
  height: "2rem",
};

const SkillContainer = styled.label`
  ${commonStyle}
  display:flex;
  align-items: center;
  box-sizing: border-box;
  max-width: 8.75rem;

  gap: 0.625rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.gray7};
`;

interface SkillInputProps {
  isDuplicate?: boolean;
}

const SkillInput = styled.input`
  all: unset;
  width: 100%;
  box-sizing: border-box;
  ${commonStyle}
  box-sizing: border-box;
  background-color: transparent;
  ${({ theme }) => theme.fonts.body14En}
  ${({ isDuplicate }: SkillInputProps) => ({
    color: isDuplicate ? "orange !important" : "#3ddfe9",
    textDecoration: isDuplicate ? "line-through" : "none",
    fontWeight: isDuplicate ? "bold" : "normal",
  })}
`;

const CancelButton = styled(Image)`
  cursor: pointer;
  padding: 0.125rem;
`;

export default Skill;

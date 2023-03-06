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
        size={skill ? skill.length + 3 : 3}
        value={skill}
        onChange={onChange}
        maxLength={20}
        isDuplicate={isDuplicate}
        onKeyPress={handleOnKeyDown}
        ref={isLast ? lastSkillRef : null}
        // onBlur={handleOnBlur}
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
  border-radius: 0.25rem;
  box-sizing: border-box;
  width: fit-content;

  gap: 0.625rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.gray7};
`;

interface SkillInputProps {
  isDuplicate?: boolean;
}

const SkillInput = styled.input<SkillInputProps>`
  /* ${commonStyle} */
  all: unset;
  ${(props) => props.theme.fonts.body14En}
  width:5rem;
  box-sizing: border-box;
  background-color: transparent;
  ${({ isDuplicate, theme }) => ({
    color: isDuplicate ? theme.colors.messageError : theme.colors.primary6,
    textDecoration: isDuplicate ? "line-through" : "none",
    fontWeight: isDuplicate ? "bold" : "normal",
  })};
`;

const CancelButton = styled(Image)`
  cursor: pointer;
  padding: 0.125rem;
`;

export default Skill;

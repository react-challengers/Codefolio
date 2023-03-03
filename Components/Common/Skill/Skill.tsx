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
        width="12"
        height="12"
      />
    </SkillContainer>
  );
};

export const commonStyle = {
  "background-color": "grey",
  color: "white",
  height: "2.125rem",
  border: "none",
  padding: "0 0.75rem",
  outline: "none",
};

const SkillContainer = styled.label`
  ${commonStyle}
  display:flex;
  align-items: center;
  border-radius: 0.25rem;
  background-color: ${(props) => props.theme.colors.gray8};
`;

interface SkillInputProps {
  isDuplicate?: boolean;
}

const SkillInput = styled.input<SkillInputProps>`
  /* ${commonStyle} */
  all: unset;
  ${(props) => props.theme.fonts.body14En}
  width:5rem;
  ${({ isDuplicate, theme }) => ({
    color: isDuplicate ? theme.colors.messageError : theme.colors.primary6,
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

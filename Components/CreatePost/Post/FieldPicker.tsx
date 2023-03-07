import { postMembers } from "@/lib/recoil";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import arrow_down from "@/public/icons/arrow_down.svg";
import useOutsideClick from "@/hooks/query/useOutsideClick";
import Image from "next/image";
import styled from "styled-components";
import FieldDropDown from "./FieldDropDown";

interface FieldPickerProps {
  field: string;
  idx: number;
}
const FieldPicker = ({ field, idx }: FieldPickerProps) => {
  const fieldRef = useRef<any>();
  const [visibleField, setVisibleField] = useState(false);
  const [people, setPeople] = useRecoilState(postMembers);

  useOutsideClick(fieldRef, () => setVisibleField(false));

  const handleClickField = (item: string) => {
    const newPeople = people.map((person, i) => {
      if (i === idx) return { ...person, field: item };
      return person;
    });
    setPeople(newPeople);

    setVisibleField(false);
  };

  const handleShowField = () => {
    setVisibleField(!visibleField);
  };
  return (
    <FieldPickerContainer onClick={handleShowField} ref={fieldRef}>
      {field ? <span>{field}</span> : <span>참여 포지션</span>}
      <DropdownImage
        src={arrow_down}
        alt="category selete icon"
        width={16}
        height={16}
      />
      {visibleField && (
        <FieldDropDown
          handleClick={handleClickField}
          visibleToggle={handleShowField}
        />
      )}
    </FieldPickerContainer>
  );
};

const FieldPickerContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 100%;
  cursor: pointer;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray7};
  ${({ theme }) => theme.fonts.body14Medium};

  span {
    color: ${({ theme }) => theme.colors.white};
    display: flex;
    padding: 0.625rem 1rem;
  }
`;

const DropdownImage = styled(Image)`
  margin: 0.75rem;
`;

export default FieldPicker;

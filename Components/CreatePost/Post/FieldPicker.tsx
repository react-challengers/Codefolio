import { postMembers } from "@/lib/recoil";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import arrow_down from "@/public/icons/arrow_down.svg";
import Image from "next/image";
import styled from "styled-components";
import FieldDropDown from "./FieldDropDown";

interface FieldPickerProps {
  field: string;
}
const FieldPicker = ({ field }: FieldPickerProps) => {
  const [visibleField, setVisibleField] = useState(false);
  const setPeople = useSetRecoilState(postMembers);

  const handleClickField = (item: string) => {
    setPeople((prev) => {
      const lastPeople = prev[prev.length - 1];
      return [
        ...prev.slice(0, prev.length - 1),
        { ...lastPeople, field: item },
      ];
    });
    setVisibleField(false);
  };
  const handleShowField = () => {
    setVisibleField(!visibleField);
  };
  return (
    <FieldPickerContainer onClick={handleShowField}>
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
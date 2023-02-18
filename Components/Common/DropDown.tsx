import React, { Dispatch } from "react";
import styled from "styled-components";

type ComponenetType = "birth_year" | "career";
interface DropDownProps {
  type: ComponenetType;
  editBirthYear?: string;
  setEditBirthYear?: Dispatch<React.SetStateAction<string>>;
  editCareer?: string;
  setEditCareer?: Dispatch<React.SetStateAction<string>>;
}
const DropDown = ({
  type,
  editBirthYear: editbirthYear,
  setEditBirthYear,
  editCareer,
  setEditCareer,
}: DropDownProps) => {
  const BASEYEAR = 1950;
  const options: (string | number)[] = [];

  const years = Array.from(
    { length: new Date().getFullYear() - BASEYEAR + 1 },
    (_, i) => {
      return new Date().getFullYear() - i;
    }
  );

  if (type === "birth_year") {
    years.forEach((year) => options.push(year));
  }

  if (type === "career") {
    for (let i = 1; i < 20; i += 1) {
      options.push(`${i}년차`);
    }
    options.unshift("신입");
    options.push("20년차 이상");
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (setEditBirthYear) setEditBirthYear(e.target.value);
    if (setEditCareer) setEditCareer(e.target.value);
  };

  return (
    <Select
      onChange={onChangeHandler}
      defaultValue={type === "birth_year" ? editbirthYear : editCareer}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Select>
  );
};

const Select = styled.select`
  height: 3.5rem;
  width: 19.0625rem;
  padding: 0.75rem;

  color: inherit;
  &:focus {
    background-color: #eee;
  }
`;

export default DropDown;

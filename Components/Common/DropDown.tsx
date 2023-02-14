import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

type ComponenetType = "birth_year" | "career";
interface DropDownProps {
  type: ComponenetType;
}
/**
 * @example
 * <DropDown data="birth_year" />
 * <DropDown data="careerer" />
 * @TODO 컴포넌트별 스타일 분리
 */
const DropDown = ({ type }: DropDownProps) => {
  const [selectValue, setSelectValue] = useState("");
  const BASEYEAR = 1950;

  const options: string[] = [];
  const years = Array.from(
    { length: new Date().getFullYear() - BASEYEAR + 1 },
    (_, i) => {
      return new Date().getFullYear() - i;
    }
  );

  if (type === "birth_year") {
    years.forEach((year) => options.push(String(year)));
    setSelectValue(options[0]);
  }

  if (type === "career") {
    for (let i = 1; i < 20; i += 1) {
      options.push(`${i}년차`);
    }
    options.unshift("신입");
    options.push("20년차 이상");
    setSelectValue(options[0]);
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
  };
  return (
    <Select onChange={onChangeHandler} defaultValue={options[0]}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Select>
  );
};

export default DropDown;

const Select = styled.select`
  height: 3.5rem;
  width: 19.0625rem;
  padding: 0.75rem;

  color: inherit;
  &:focus {
    border-color: red;
  }
`;

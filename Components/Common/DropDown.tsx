import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

type ComponenetType = "birth_year" | "careerer";
interface DropDownProps {
  data: ComponenetType;
}
/**
 * @example
 * <DropDown data="birth_year" />
 * <DropDown data="careerer" />
 * @TODO 컴포넌트별 스타일 분리
 */
const DropDown = ({ data }: DropDownProps) => {
  const [selectValue, setSelectValue] = useState("");
  const BASEYEAR = 1950;

  const options: string[] = [];
  const years = Array.from(
    { length: new Date().getFullYear() - BASEYEAR + 1 },
    (_, i) => {
      return new Date().getFullYear() - i;
    }
  );

  if (data === "birth_year") {
    years.forEach((year) => options.push(String(year)));
  }
  if (data === "careerer") {
    for (let i = 1; i < 20; i += 1) {
      options.push(`${i}년차`);
    }
    options.unshift("신입");
    options.push("20년차 이상");
  }
  const optionRef = useRef<HTMLSelectElement | string | InnerHTML>(options[0]);
  useEffect(() => {
    setSelectValue(optionRef.current[0].innerText);
  }, []);

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
  };
  return (
    <Select
      onChange={onChangeHandler}
      defaultValue={options[0]}
      ref={optionRef}
    >
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

import React from "react";
import styled from "styled-components";

interface Options {
  options: Option[];
  defaultValue: number | string;
}
interface Option {
  value: number | string;
}

/**
 * @returns {value} - 드롭다운 option
 * @example
 * <DropDown options={data} defaultValue={2023}>
 * const data = [...{value: number | string}]
 */
const DropDown = ({ defaultValue, options }: Options) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
  };

  return (
    <Select onChange={handleChange}>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          defaultValue={defaultValue}
        >
          {option.value}
        </option>
      ))}
    </Select>
  );
};

export default DropDown;

const Select = styled.select`
  display: flex;
  padding: 8px 8px;
  border: 1px solid;
  border-radius: 4px;
  color: inherit;
  &:focus {
    border-color: red;
  }
`;

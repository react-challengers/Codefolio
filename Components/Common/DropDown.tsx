import React from "react";
import styled from "styled-components";

interface Options {
  options: number[] | string[];
  defaultValue: number | string;
}

/**
 * @returns {options} - 드롭다운 option[]
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
        <option key={option} value={option} defaultValue={defaultValue}>
          {option}
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

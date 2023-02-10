import React from "react";
import styled from "styled-components";

interface DropdownProps<T> {
  options: T[];
  defaultValue: T;
}

/**
 * @returns {options} - 드롭다운 option[]
 * @example
 * <DropDown options={data} defaultValue={2023}>
 * const data = [...{value: number | string}]
 */
const DropDown = ({
  defaultValue,
  options,
}: DropdownProps<string | number>) => {
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
  padding: 0.5rem 0.5rem;
  border: 1px solid;
  border-radius: 0.25rem;
  color: inherit;
  &:focus {
    border-color: red;
  }
`;

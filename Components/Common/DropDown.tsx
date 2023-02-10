import React from "react";

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
    <select onChange={handleChange}>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          defaultValue={defaultValue}
        >
          {option.value}
        </option>
      ))}
    </select>
  );
};

export default DropDown;

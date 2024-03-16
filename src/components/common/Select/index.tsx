import React from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  value: string;
  handleChangeSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({ options, value, handleChangeSelect }: SelectProps) => (
  <select
    required
    className="bg-gray2 rounded-lg text-body2 placeholder-text-gray4 h-10 pl-3 w-full"
    value={value}
    onChange={handleChangeSelect}
  >
    {options.map((option) => (
      <option
        key={option.value}
        value={option.value}
        // selected={option.value === ''}
        disabled={option.value === ""}
        hidden={option.value === ""}
      >
        {option.label}
      </option>
    ))}
  </select>
);

export default Select;

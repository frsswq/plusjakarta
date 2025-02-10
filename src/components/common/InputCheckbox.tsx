import React from "react";

interface InputCheckboxProps {
  label: string;
  checked: boolean;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputCheckbox({
  label,
  checked,
  value,
  handleChange,
}: InputCheckboxProps) {
  return (
    <label className="flex h-fit w-fit items-center">
      <input
        type="checkbox"
        className="peer cursor-pointer appearance-none"
        value={value}
        defaultChecked={checked}
        onChange={handleChange}
      />
      <span
        className="flex cursor-pointer items-center text-sm text-gray-500 select-none
          peer-checked:text-black"
      >
        {label}
      </span>
    </label>
  );
}

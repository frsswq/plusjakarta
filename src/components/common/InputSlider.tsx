import React, { useId } from "react";

interface InputSliderProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  detail?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputSlider({
  label,
  min,
  max,
  step,
  value,
  detail,
  handleChange,
}: InputSliderProps) {
  const inputSliderID = useId();

  return (
    <div className="flex w-fit items-center gap-x-2">
      <label
        htmlFor={inputSliderID}
        className="align-middle text-xs whitespace-nowrap"
      >
        {label}
      </label>
      <input
        id={inputSliderID}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="items-center focus:outline-none"
      />
      <output className="text-xs">
        {value}
        {detail}
      </output>
    </div>
  );
}

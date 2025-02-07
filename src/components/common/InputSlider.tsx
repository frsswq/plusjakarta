import React from "react";
import "../../styles/rangeSlider.css";

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
  return (
    <div className="flex w-fit items-center gap-x-2 rounded-md">
      <label className="align-middle text-xs whitespace-nowrap">{label}</label>
      <input
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

import { useId } from "react";
import { type FontInputSliderProps } from "../../types/commonProps";

export default function FontInputSlider({
  label,
  min,
  max,
  step,
  value,
  detail,
  handleChange,
}: FontInputSliderProps) {
  const fontInputSliderID = useId();

  return (
    <div className="flex w-fit items-center gap-x-2">
      <label
        htmlFor={fontInputSliderID}
        className="align-middle text-sm font-medium whitespace-nowrap"
      >
        {label}
      </label>
      <input
        id={fontInputSliderID}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="items-center focus:outline-none"
      />
      <output className="text-sm font-medium tracking-tight tabular-nums">
        {value}
        {detail}
      </output>
    </div>
  );
}

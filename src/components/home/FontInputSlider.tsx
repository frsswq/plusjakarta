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
    <div className="flex w-full max-w-[300px] items-center gap-x-2">
      <label
        htmlFor={fontInputSliderID}
        className="align-middle text-sm whitespace-nowrap"
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
      <output className="text-right text-sm text-zinc-500 tabular-nums">
        {value}&nbsp;{detail}
      </output>
    </div>
  );
}

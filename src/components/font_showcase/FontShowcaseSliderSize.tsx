import { memo } from "react";
import { Slider } from "../ui/slider.tsx";
import { type FontShowcaseSliderSizeProps } from "@/types/commonProps.ts";

import ClarityFontSizeLine from "../icons/ClarityFontSizeLine.tsx";

const SliderMemo = memo(Slider);

const FontShowcaseSliderSize = ({
  value,
  min,
  max,
  step,
  onValueChange,
  onValueCommit,
}: FontShowcaseSliderSizeProps) => {
  return (
    <div
      className="group/slider flex h-9 w-[350px] items-center gap-2 rounded-xs bg-transparent
        px-3 whitespace-nowrap antialiased"
    >
      <ClarityFontSizeLine className="size-5.5 text-zinc-700 group-hover/slider:text-black" />
      <SliderMemo
        value={[value]}
        onValueChange={([val]) => onValueChange(val)}
        onValueCommit={([val]) => onValueCommit([val])}
        min={min}
        max={max}
        step={step}
        ariaLabel="Font size slider"
      />
      <span
        className="text-sm font-normal tracking-tight text-zinc-700 tabular-nums
          group-hover:font-[450] group-hover/slider:text-black"
      >
        {value}px
      </span>
    </div>
  );
};

export default memo(FontShowcaseSliderSize);

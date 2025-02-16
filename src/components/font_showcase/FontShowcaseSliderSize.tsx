import { Slider } from "@/components/ui/slider";
import ClarityFontSizeLine from "../icons/ClarityFontSizeLine";

interface FontShowcaseSliderSizeProps {
  value: number;
  onValueChange: (fontSize: number) => void;
}

export default function FontShowcaseSliderSize({
  value,
  onValueChange,
}: FontShowcaseSliderSizeProps) {
  return (
    <div
      className="group flex size-full max-w-[350px] items-center gap-2 rounded-xs border
        border-zinc-200 px-3 whitespace-nowrap antialiased hover:border-zinc-300
        hover:bg-zinc-50/10 hover:shadow-2xs"
    >
      <ClarityFontSizeLine className="size-6 text-zinc-700 group-hover:text-black" />
      <Slider
        value={[value]}
        onValueChange={(e) => onValueChange(e[0])}
        min={1}
        max={300}
        step={1}
      />
      <span
        className="text-sm font-normal tracking-tight text-zinc-700 tabular-nums
          group-hover:font-[450] group-hover:text-black"
      >
        {value}px
      </span>
    </div>
  );
}

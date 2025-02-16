import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { fontWeightsLabel } from "@/data/fontShowcaseData";

interface FontShowcaseSelectWeightProps {
  value: string;
  onValueChange: (fontWeight: string) => void;
}
export default function FontShowcaseSelectWeight({
  value,
  onValueChange,
}: FontShowcaseSelectWeightProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className="h-9 w-[150px] rounded-xs text-zinc-700 hover:cursor-pointer
          hover:border-zinc-300 hover:bg-zinc-50/10 hover:font-[450] hover:text-black
          hover:shadow-2xs data-[state=open]:border-zinc-300 data-[state=open]:font-[450]
          data-[state=open]:text-black data-[state=open]:shadow-2xs md:w-[300px]"
        aria-label="Select font weigth"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="rounded-xs border-zinc-300 shadow-2xs">
        {fontWeightsLabel.map((weight) => (
          <SelectItem
            value={weight.value}
            key={weight.value}
            className="rounded-xs text-zinc-700 focus:cursor-pointer focus:font-[450] focus:text-black"
          >
            {weight.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

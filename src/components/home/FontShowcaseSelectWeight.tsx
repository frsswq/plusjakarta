import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { fontWeightsLabel } from "../../data/fontShowcaseData";

export default function FontShowcaseSelectWeight() {
  return (
    <Select>
      <SelectTrigger className="w-full max-w-[300px] rounded-none border-zinc-200 text-sm shadow-none">
        <SelectValue placeholder="ExtraBold" />
      </SelectTrigger>
      <SelectContent className="rounded-none border-zinc-200 bg-white shadow-none">
        {fontWeightsLabel.map((weight) => (
          <SelectItem
            value={weight.value}
            className="rounded-none shadow-none focus:bg-zinc-100"
          >
            {weight.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

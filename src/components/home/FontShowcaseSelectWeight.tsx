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
      <SelectTrigger className="max-w-[300px]">
        <SelectValue placeholder="ExtraBold" />
      </SelectTrigger>
      <SelectContent>
        {fontWeightsLabel.map((weight) => (
          <SelectItem value={weight.value} key={weight.value}>
            {weight.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

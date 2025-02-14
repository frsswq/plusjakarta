import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

interface FontShowcaseCheckboxFeaturesProps {
  onChange?: (selectedItems: string[]) => void;
}

const options = [
  { id: "ss01", label: "Lurus", value: "ss01" },
  { id: "ss02", label: "Lancip", value: "ss02" },
  { id: "ss03", label: "Lingkar", value: "ss03" },
];

export default function FontShowcaseCheckboxFeatures({
  onChange,
}: FontShowcaseCheckboxFeaturesProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const handleItemToggle = (itemId: string) => {
    setSelectedItems((current) => {
      const newSelectedItems = current.includes(itemId)
        ? current.filter((id) => id !== itemId)
        : [...current, itemId];
      onChange?.(newSelectedItems);
      return newSelectedItems;
    });
  };

  const getFontFeatureSettings = () => {
    return selectedItems.map((item) => `"${item}" 1`).join(", ");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full max-w-[100px] rounded-none font-normal shadow-none"
        >
          OpenType
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[100px] rounded-none p-0 shadow-none">
        <div className="space-y-2 p-2">
          {options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={option.id}
                checked={selectedItems.includes(option.id)}
                onCheckedChange={() => handleItemToggle(option.id)}
              />
              <label htmlFor={option.id} className="text-sm leading-none">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

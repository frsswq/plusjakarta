import { memo } from "react";
import { Toggle } from "../ui/toggle.tsx";

import { cn } from "@/lib/utils";

interface FontShowcaseToggleProps {
  title: string;
  ariaLabel?: string;
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

const FontShowcaseToggle = ({
  title,
  ariaLabel,
  pressed,
  onPressedChange,
  className,
  children,
}: FontShowcaseToggleProps) => {
  return (
    <Toggle
      title={title}
      aria-label={ariaLabel}
      pressed={pressed}
      onPressedChange={onPressedChange}
      className={cn(
        `size-8 cursor-pointer items-center justify-center gap-2 rounded-xs bg-white px-3
        text-sm text-zinc-500 hover:bg-zinc-100 hover:text-black focus-visible:ring-0
        focus-visible:outline-none data-[state=on]:bg-zinc-100
        data-[state=on]:text-black`,
        className,
      )}
    >
      {children}
    </Toggle>
  );
};

export default memo(FontShowcaseToggle);

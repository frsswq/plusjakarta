import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  ariaLabel?: string;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ ariaLabel, className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex w-full touch-none items-center select-none",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track
      className="relative h-1 w-full grow overflow-hidden rounded-[1.5px] bg-zinc-200
        hover:cursor-pointer"
    >
      <SliderPrimitive.Range className="absolute h-full bg-zinc-700" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      aria-label={ariaLabel}
      className="bg-background focus-visible:ring-ring block h-5 w-2.5 rounded-xs border-[0.5px]
        border-zinc-700 transition-colors hover:cursor-grab hover:border-black
        focus-visible:ring-0 focus-visible:outline-none active:cursor-grabbing"
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };

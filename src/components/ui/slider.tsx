import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none items-center select-none",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-zinc-200">
      <SliderPrimitive.Range className="absolute h-full bg-zinc-700" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className="bg-background focus-visible:ring-ring block h-4 w-4 rounded-full border
        border-zinc-500 transition-colors focus-visible:ring-0
        focus-visible:outline-none"
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };

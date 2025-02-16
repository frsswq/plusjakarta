import * as React from "react";
import { Toggle as TogglePrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>
>(({ className, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(
      `inline-flex h-9 min-w-9 items-center justify-center gap-2 rounded-xs border
      border-zinc-200 bg-transparent px-3 text-sm text-zinc-700
      inset-shadow-zinc-500/10 hover:cursor-pointer hover:border-zinc-300
      hover:bg-zinc-50/10 hover:font-[450] hover:text-black hover:shadow-2xs
      focus-visible:ring-0 focus-visible:outline-none data-[state=on]:rounded-sm
      data-[state=on]:font-[450] data-[state=on]:text-black
      data-[state=on]:inset-ring-2 data-[state=on]:inset-shadow-2xs
      data-[state=on]:inset-ring-zinc-50/10 [&_svg]:pointer-events-none [&_svg]:size-4
      [&_svg]:shrink-0`,

      className,
    )}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle };

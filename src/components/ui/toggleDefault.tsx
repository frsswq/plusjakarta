import * as React from "react";
import { Toggle as TogglePrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

const ToggleDefault = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>
>(({ className, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(
      `inline-flex size-8 cursor-pointer items-center justify-center gap-2 rounded-xs
      bg-white px-3 text-sm text-zinc-500 hover:bg-zinc-100 hover:text-black
      focus-visible:ring-0 focus-visible:outline-none data-[state=on]:bg-zinc-100
      data-[state=on]:text-black [&_svg]:pointer-events-none [&_svg]:size-4
      [&_svg]:shrink-0`,

      className,
    )}
    {...props}
  />
));

ToggleDefault.displayName = TogglePrimitive.Root.displayName;

export { ToggleDefault };

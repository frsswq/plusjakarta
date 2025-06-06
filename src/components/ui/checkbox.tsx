import * as React from 'react';
import { Checkbox as CheckboxPrimitive } from 'radix-ui';
import { cn } from '@lib/utils';

const Checkbox = React.forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
	<CheckboxPrimitive.Root
		ref={ref}
		className={cn(
			`peer border-primary focus-visible:ring-ring data-[state=checked]:bg-primary
			data-[state=checked]:text-primary-foreground h-4 w-4 shrink-0 rounded-sm border shadow
			focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`,
			className
		)}
		{...props}
	>
		<CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
			<span className="h-3 w-3 bg-zinc-500" />
		</CheckboxPrimitive.Indicator>
	</CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

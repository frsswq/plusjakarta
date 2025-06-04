import * as React from 'react';
import { Label as LabelPrimitive } from 'radix-ui';
import { cn } from '@lib/utils';

const Label = React.forwardRef<
	React.ElementRef<typeof LabelPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
	<LabelPrimitive.Root ref={ref} className={cn('text-sm leading-none', className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

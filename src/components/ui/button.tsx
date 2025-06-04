import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cn } from '@lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp
				className={cn(
					`border-input bg-background inline-flex size-8 items-center justify-center gap-2 text-sm
					whitespace-nowrap focus-visible:ring-0 focus-visible:outline-none [&_svg]:pointer-events-none
					[&_svg]:size-4 [&_svg]:shrink-0`,
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);

Button.displayName = 'Button';

export { Button };

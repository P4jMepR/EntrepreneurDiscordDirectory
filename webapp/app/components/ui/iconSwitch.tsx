import * as SwitchPrimitives from "@radix-ui/react-switch";
import * as React from "react";
import { cn } from "~/lib/utils";

const IconSwitch = React.forwardRef<
	React.ElementRef<typeof SwitchPrimitives.Root>,
	React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, children, ...props }, ref) => (
	<SwitchPrimitives.Root
		className={cn(
			"peer inline-flex h-[1.6rem] w-[2.7rem] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-zinc-600",
			className,
		)}
		{...props}
		ref={ref}
	>
		<SwitchPrimitives.Thumb
			className={cn(
				"relative pointer-events-none flex items-center justify-center h-[1.5rem] w-[1.5rem] rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
			)}
		>
			{children}
		</SwitchPrimitives.Thumb>
	</SwitchPrimitives.Root>
));
IconSwitch.displayName = SwitchPrimitives.Root.displayName;

export { IconSwitch };

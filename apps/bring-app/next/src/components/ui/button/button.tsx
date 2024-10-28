import {Slot} from "@radix-ui/react-slot";
import {cva, type VariantProps} from "class-variance-authority";
import * as React from "react";

import {cn} from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex duration-300 font-medium cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full text-18 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-center",
	{
		variants: {
			variant: {
				primary: "text-white bg-purple-600 hover:bg-purple-800",
				destructive: "bg-red-600 text-white hover:bg-red-600/90",
				outline:
					"text-white outline outline-purple-600 hover:text-white hover:outline-white -outline-offset-2",
				secondary: "text-white bg-gray-600 hover:bg-gray-800",
				ghost: "hover:bg-purple-600 text-gray-300 hover:text-white",
				link: "text-purple-600 underline-offset-4 hover:underline",
			},
			size: {
				sm: "py-1 px-4",
				md: "py-2 px-8",
				lg: "py-4 px-12",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "md",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({className, variant, size, asChild = false, ...props}: ButtonProps, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({variant, size, className}))}
				ref={ref}
				{...props}
			/>
		);
	},
);

const Link = React.forwardRef<HTMLAnchorElement, ButtonProps>(
	({className, variant, size, asChild = false, ...props}: ButtonProps, ref) => {
		const Comp = asChild ? Slot : "a";
		return (
			<Comp
				className={cn(buttonVariants({variant, size, className}))}
				ref={ref}
				{...props}
			/>
		);
	},
);

Link.displayName = "Link";
Button.displayName = "Button";

export default Button;
export {buttonVariants};

import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

export const buttonVariants = cva(
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
	}
)

type BaseProps = VariantProps<typeof buttonVariants> & {
	asChild?: boolean
	isLoading?: boolean
	loadingMessage?: string
}

type AsLink = {
	as: "Link"
} & BaseProps &
	React.AnchorHTMLAttributes<HTMLAnchorElement>

type AsButton = {
	as?: "button"
} & BaseProps &
	React.ButtonHTMLAttributes<HTMLButtonElement>

export type ButtonProps = AsButton | AsLink

const ButtonButton = React.forwardRef<HTMLButtonElement, AsButton>(
	(
		{
			className,
			variant,
			size,
			asChild = false,
			isLoading = false,
			loadingMessage = "Please wait",
			children,
			...props
		}: AsButton,
		ref
	) => {
		const Comp = asChild ? Slot : "button"
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				disabled={isLoading || props.disabled}
				{...props}
			>
				{isLoading ? (
					<>
						<Loader2 className="animate-spin" />
						{loadingMessage}
					</>
				) : (
					children
				)}
			</Comp>
		)
	}
)
ButtonButton.displayName = "ButtonButton"

const Link = React.forwardRef<HTMLAnchorElement, AsLink>(
	(
		{
			className,
			variant,
			size,
			asChild = false,
			isLoading = false,
			loadingMessage = "Please wait",
			children,
			...props
		}: AsLink,
		ref
	) => {
		const Comp = asChild ? Slot : "a"
		return (
			<Comp
				className={cn(
					buttonVariants({ variant, size, className }),
					isLoading && "pointer-events-none opacity-50"
				)}
				ref={ref}
				{...props}
			>
				{isLoading ? (
					<>
						<Loader2 className="animate-spin" />
						{loadingMessage}
					</>
				) : (
					children
				)}
			</Comp>
		)
	}
)
Link.displayName = "Link"

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
	({ as, ...props }: ButtonProps, ref) => {
		if (as === "Link") {
			return <Link {...(props as AsLink)} ref={ref as React.Ref<HTMLAnchorElement>} />
		}
		return <ButtonButton {...(props as AsButton)} ref={ref as React.Ref<HTMLButtonElement>} />
	}
)
Button.displayName = "Button"

export default Button

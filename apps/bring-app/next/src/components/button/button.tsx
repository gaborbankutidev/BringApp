import {twJoin, twMerge} from "@/utils";
import Link, {type LinkProps} from "next/link";
import type {ReactNode} from "react";
import {BiRightArrowAlt} from "react-icons/bi";

// types
export type ButtonTheme = {
	size?: keyof typeof sizes;
	variant?: keyof typeof variants;
	arrow?: boolean;
	disabled?: boolean;
};

type AsLink = {
	as: "Link";
	href?: string;
} & ButtonTheme & {
		children?: ReactNode;
		className?: string;
		id?: string;
	} & Omit<LinkProps, "as" | "size">;

type AsButton = {
	as?: "button";
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
} & ButtonTheme & {
		children?: ReactNode;
		className?: string;
		id?: string;
	} & Omit<React.HTMLProps<HTMLButtonElement>, "as" | "size">;

type ButtonProps = AsButton | AsLink;

// styles & variants
const baseStyles =
	"group border-2 rounded-xl font-bold py-2 px-3 inline-flex items-center justify-center transition-all duration-300 gap-x-3";

const variants = {
	contained:
		"bg-brick border-brick text-white hover:bg-orange hover:border-orange",
	outlined:
		"border-brick text-brick hover:border-orange hover:bg-transparent hover:text-orange",
	text: "text-brick hover:text-orange font-semibold bg-transparent border-transparent",
} as const;

const sizes = {
	sm: {
		contained: "btn-sm text-12xs",
		outlined: "btn-sm text-12xs",
		"outlined-blue": "btn-sm text-12xs",
		text: "text-16xs",
	},
	md: {
		contained: "",
		outlined: "",
		"outlined-blue": "",
		text: "text-20xs",
	},
} as const;

const arrowClassNames =
	"transition-all duration-300 group-hover:translate-x-1 w-[12px] h-[12px] flex items-center justify-center";

// Button
const Button = ({
	as = "button",
	variant = "contained",
	size = "md",
	arrow = variant === "text",
	children,
	className,
	...props
}: ButtonProps) => {
	const classNames = twMerge(
		baseStyles,
		variants[variant],
		sizes[size][variant],
		className,
	);

	if (as === "Link") {
		return (
			<Link className={classNames} {...(props as LinkProps)}>
				{children}
				{arrow && (
					<div className={twJoin(arrowClassNames, "-my-1")}>
						<BiRightArrowAlt
							size={size === "sm" ? 14 : 16}
							className="shrink-0"
						/>
					</div>
				)}
			</Link>
		);
	}

	return (
		<button
			className={classNames}
			{...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
		>
			{children}
			{arrow && (
				<div className={twJoin(arrowClassNames, "-my-1")}>
					<BiRightArrowAlt
						size={size === "sm" ? 14 : 16}
						className="shrink-0"
					/>
				</div>
			)}
		</button>
	);
};

export default Button;

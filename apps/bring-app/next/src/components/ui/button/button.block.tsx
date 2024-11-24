import {BP} from "@/bring";
import clsx from "clsx";
import Button from "./button";

export type ButtonBlockProps = {
	text: string;
	href?: string;
	newTab?: boolean;
	variant?: "primary" | "destructive" | "outline" | "secondary" | "ghost" | "link";
	size?: "sm" | "md" | "lg" | "icon";
};

export const ButtonBlock = ({
	text = "",
	href = "#",
	newTab = false,
	size = "md",
	variant = "primary",
	bringStylesClassNames,
	className = "",
	id,
}: BP<ButtonBlockProps>) => {
	const classNames = clsx(bringStylesClassNames?.classNames, className);
	return (
		<Button
			as="Link"
			variant={variant}
			href={href}
			target={newTab ? "_blank" : "_self"}
			size={size}
			className={classNames}
			id={id}
		>
			{text}
		</Button>
	);
};

export const button = {
	Component: ButtonBlock,
	componentName: "bring/button",
} as const;

export default Button;

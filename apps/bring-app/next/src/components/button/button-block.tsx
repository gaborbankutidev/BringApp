import {type BP} from "@/bring";
import {twJoin} from "@/utils";
import Button, {type ButtonTheme} from "./button";

export type ButtonBlockProps = {
	text: string;
	href?: string;
	newTab?: boolean;
} & ButtonTheme;

const ButtonBlock = ({
	text = "",
	href = "#",
	newTab = false,
	size = "md",
	variant = "contained",
	bringStylesClassNames,
	className = "",
	id,
}: BP<ButtonBlockProps>) => {
	const classNames = twJoin(bringStylesClassNames?.classNames, className);

	return (
		<Button
			as="Link"
			variant={variant}
			href={href}
			// @ts-ignore
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
	componentName: "Button",
};

export default ButtonBlock;

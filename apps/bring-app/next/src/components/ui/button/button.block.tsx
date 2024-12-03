import {BP} from "@/bring";
import Button from "./button";

export type ButtonBlockProps = {
	text: string;
	href?: string;
	newTab?: boolean;
	variant?: "primary" | "destructive" | "outline" | "secondary" | "ghost" | "link";
	size?: "sm" | "md" | "lg" | "icon";
};

export const ButtonBlock = ({
	attributes: {text, newTab = false, ...props},
}: BP<ButtonBlockProps>) => {
	return (
		<Button as="Link" target={newTab ? "_blank" : "_self"} {...props}>
			{text}
		</Button>
	);
};

export const button = {
	Block: ButtonBlock,
	blockName: "bring/button",
	blockStylesConfig: {
		spacing: {
			m: {
				t: {},
				b: {},
				l: {},
				r: {},
			},
		},
		visibility: {"": "inline-flex", md: "inline-flex", lg: "inline-flex"},
	},
} as const;

export default Button;

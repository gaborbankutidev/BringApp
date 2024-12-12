import Link from "next/link"

import { type BP } from "@/bring"
import Button from "./button"

export type ButtonBlockProps = {
	text: string
	href?: string
	newTab?: boolean
	variant?: "primary" | "destructive" | "outline" | "secondary" | "ghost" | "link"
	size?: "sm" | "md" | "lg" | "icon"
}

export const ButtonBlock = ({
	attributes: { text, href = "#", newTab = false, ...props },
}: BP<ButtonBlockProps>) => {
	return (
		<Button asChild {...props}>
			<Link href={href} target={newTab ? "_blank" : "_self"}>
				{text}
			</Link>
		</Button>
	)
}

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
		visibility: { "": "inline-flex", md: "inline-flex", lg: "inline-flex" },
	},
} as const

export default Button

import type { BP } from "@/bring"
import { cn } from "@/lib/utils"
import { type ColorType } from "@/styles/colors"
import { makeResponsiveClassNames, type ResponsiveValue } from "@bring/blocks-client/styles"
import Basic from "./basic"

export type BasicBlockProps = {
	bool: boolean
	string: string
	number?: number
	button: {
		label?: string
		url?: string
		className?: string
		id?: string
	}
	backgroundColor?: ColorType
	containerGap?: ResponsiveValue
	containerBackgroundColor?: ResponsiveValue<ColorType>
	containerClassName?: string
}

const BasicBlock = ({
	attributes: {
		button,
		backgroundColor,
		containerGap = {},
		containerBackgroundColor = {},
		className,
		containerClassName,
		...props
	},
	children,
}: BP<BasicBlockProps>) => {
	const b =
		button.label && button.url
			? {
					label: button.label,
					url: button.url,
					className: button.className,
					id: button.id,
				}
			: undefined

	const classNames = cn(backgroundColor && `bg-${backgroundColor}`, className)

	const containerClassNames = cn(
		makeResponsiveClassNames("gap", containerGap, { "": 3 }),
		makeResponsiveClassNames("bg", containerBackgroundColor, { "": "gray-300" }),
		containerClassName
	)

	return (
		<Basic button={b} className={classNames} containerClassName={containerClassNames} {...props}>
			{children}
		</Basic>
	)
}

export const basic = {
	Block: BasicBlock,
	blockName: "bring/basic",
	blockStylesConfig: {
		spacing: {
			p: {
				t: { "": 4 },
				b: { "": 4 },
				l: { "": 4 },
				r: { "": 4 },
			},
			m: {
				t: {},
				b: {},
				l: {},
				r: {},
			},
		},
		visibility: { "": "block", md: "block", lg: "block" },
	},
} as const

export default BasicBlock

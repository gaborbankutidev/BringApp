import type { BP } from "@/bring"
import { cn } from "@/lib/utils"
import type { ColorType } from "@/styles/colors"

export type DividerBlockProps = {
	withLine?: boolean
	lineColor?: ColorType
	height?: number
}

/**
 * Divider helps to apply up white space between blocks in the editor.
 */
const DividerBlock = ({
	attributes: { height = 40, lineColor, withLine = false, className, ...props },
}: BP<DividerBlockProps>) => {
	const classNames = cn("flex items-center", className)

	return (
		<div className={classNames} style={{ minHeight: `${height}px` }} {...props}>
			{withLine && <div className={`w-full border-b border-${lineColor}`} />}
		</div>
	)
}

export const divider = {
	Block: DividerBlock,
	blockName: "bring/divider",
	blockStylesConfig: {
		spacing: {
			m: {
				t: {},
				b: {},
				l: {},
				r: {},
			},
			p: {
				t: {},
				b: {},
				l: {},
				r: {},
			},
		},
		visibility: { "": "flex", md: "flex", lg: "flex" },
	},
} as const

export default DividerBlock

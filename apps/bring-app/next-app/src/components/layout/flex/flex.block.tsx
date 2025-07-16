import type { BP } from "@/bring/types"
import BackgroundComponent from "@/components/background/background"
import BackgroundBlock, {
	type BackgroundBlockProps,
} from "@/components/background/background.block"
import { type AlignType, type DirectionType, type JustifyType } from "@/editor/utils/lists"
import { cn } from "@/lib/utils"
import type { ResponsiveValue } from "@bring/blocks-client/styles"
import { makeResponsiveClassNames } from "@bring/blocks-client/styles"
import type { GridNumType } from "@bring/blocks-client/types"

export type FlexBlockProps = {
	colSpan?: ResponsiveValue<GridNumType>
	rowSpan?: ResponsiveValue
	gap?: ResponsiveValue

	direction?: ResponsiveValue<DirectionType>
	justify?: ResponsiveValue<JustifyType>
	align?: ResponsiveValue<AlignType>

	dark?: boolean
} & BackgroundBlockProps

/**
 * The Flex block is only used in the builder to set a flex layout.
 */
const FlexBlock = ({
	attributes: {
		colSpan = {},
		rowSpan = {},
		gap = {},
		direction = {},
		justify = {},
		align = {},
		dark,
		className,
		containerClassName,
		...props
	},
	children,
}: BP<FlexBlockProps>) => {
	const classNames = cn(
		makeResponsiveClassNames("col-span", colSpan, { "": 1 }),
		makeResponsiveClassNames("row-span", rowSpan),
		"mx-0 px-0",
		dark === true && "dark",
		dark === false && "light",
		className
	)

	const containerClassNames = cn(
		"relative flex h-full",
		makeResponsiveClassNames("gap", gap, { "": 4 }),
		makeResponsiveClassNames("flex", direction, { "": "col" }),
		makeResponsiveClassNames("justify", justify),
		makeResponsiveClassNames("items", align),
		containerClassName
	)

	return (
		<BackgroundBlock containerClassName={containerClassNames} {...props}>
			<BackgroundComponent className={classNames}>{children}</BackgroundComponent>
		</BackgroundBlock>
	)
}

export const flex = {
	Block: FlexBlock,
	blockName: "bring/flex",
	blockStylesConfig: {
		spacing: {
			m: {
				t: { "": 0 },
				b: { "": 0 },
				l: {},
				r: {},
			},
			p: {
				t: { "": 0 },
				b: { "": 0 },
				l: {},
				r: {},
			},
		},
		visibility: { "": "block", md: "block", lg: "block" },
	},
} as const

export default FlexBlock

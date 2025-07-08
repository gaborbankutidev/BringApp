import BackgroundComponent from "@/components/background/background"
import BackgroundBlock, {
	type BackgroundBlockProps,
} from "@/components/background/background.block"
import { cn } from "@/lib/utils"
import type { ResponsiveValue } from "@bring/blocks-client/styles"
import { makeResponsiveClassNames } from "@bring/blocks-client/styles"
import { type BP, type GridNumType } from "@bring/blocks-client/types"

export type GridBlockProps = {
	columnCount?: ResponsiveValue<GridNumType>
	gap?: ResponsiveValue
	dark?: boolean
} & BackgroundBlockProps

/**
 * The Grid block is only used in the builder to split the content by creating a grid layout.
 */
const GridBlock = ({
	attributes: { columnCount = {}, gap = {}, dark, containerClassName, ...props },
	children,
}: BP<GridBlockProps>) => {
	const containerClassNames = cn(
		"grid",
		makeResponsiveClassNames("grid-cols", columnCount, { "": 1, lg: 2 }),
		makeResponsiveClassNames("gap", gap, { "": 8 }),
		dark === true && "dark",
		dark === false && "light",
		containerClassName
	)

	return (
		<BackgroundBlock containerClassName={containerClassNames} {...props}>
			<BackgroundComponent>{children}</BackgroundComponent>
		</BackgroundBlock>
	)
}

export const grid = {
	Block: GridBlock,
	blockName: "bring/grid",
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
		visibility: { "": "block", md: "block", lg: "block" },
	},
} as const

export default GridBlock

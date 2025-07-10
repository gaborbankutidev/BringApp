import type { BP } from "@/bring"
import type { TextAlignType, TextSourceType } from "@/editor/utils/lists"
import { cn } from "@/lib/utils"
import type { ColorType } from "@/styles/colors"
import { makeResponsiveClassNames, type ResponsiveValue } from "@bring/blocks-client/styles"
import Heading, { type HeadingLevelType } from "./heading"

export const headingVariantList = ["h1", "h2", "h3", "h4", "h5", "h6", "hl1", "hl2"] as const
type HeadingVariantType = (typeof headingVariantList)[number]

export type HeadingBlockProps = {
	source?: TextSourceType // If the source is not manual, the heading will be created from the values entity props (name, excerpt, description, etc.)
	title: string
	level?: HeadingLevelType
	variant?: HeadingVariantType
	align?: ResponsiveValue<TextAlignType>
	color?: ColorType
}

const HeadingBlock = ({
	attributes: { source = "manual", title, align = {}, color, variant, className, ...props },
	entityProps,
}: BP<HeadingBlockProps>) => {
	const classNames = cn(
		makeResponsiveClassNames("text", align),
		color && `text-${color}`,
		variant,
		className
	)

	let headingTitle: string | null = title
	if (source !== "manual") {
		if (!entityProps) return null

		headingTitle = entityProps[source]
	}

	return headingTitle !== null ? (
		<Heading className={classNames} {...props}>
			{headingTitle}
		</Heading>
	) : null
}

export const heading = {
	Block: HeadingBlock,
	blockName: "bring/heading",
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

export default HeadingBlock

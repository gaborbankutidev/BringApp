import type { Meta, StoryObj } from "@storybook/react"

import {
	alignList,
	type AlignType,
	directionList,
	type DirectionType,
	justifyList,
	type JustifyType,
} from "@/editor/utils/lists"
import { colorList } from "@/styles/colors"
import { type GridNumType } from "@bring/blocks-client"
import FlexBlock, { type FlexBlockProps } from "./flex.block"

type FlexStoryType = Omit<
	FlexBlockProps,
	"backgroundImage" | "colSpan" | "rowSpan" | "gap" | "direction" | "justify" | "align"
> & {
	backgroundImage: string
	colSpan?: GridNumType
	rowSpan?: GridNumType
	gap?: number
	direction?: DirectionType
	justify?: JustifyType
	align?: AlignType
}

const FlexStory = ({
	backgroundImage,
	colSpan,
	rowSpan,
	gap,
	direction,
	justify,
	align,
	...attributes
}: FlexStoryType) => (
	<div className="grid grid-cols-3 gap-4">
		<FlexBlock
			attributes={{
				...attributes,
				colSpan: { "": colSpan },
				rowSpan: { "": rowSpan },
				gap: { "": gap },
				direction: { "": direction },
				justify: { "": justify },
				align: { "": align },
				className: "p-8 min-h-[240px]",
				backgroundImage: { src: backgroundImage, alt: "", id: 0 },
			}}
		>
			<div className="bg-blue-300/30 h-fit w-fit p-4">1. Content of the flex (group) block.</div>
			<div className="bg-blue-300/30 h-fit w-fit p-4">2. Content of the flex (group) block.</div>
		</FlexBlock>
		<div className="flex min-h-[200px] items-center justify-center bg-gray-300">
			Other flex (group)
		</div>
		<div className="flex min-h-[200px] items-center justify-center bg-gray-300">
			Other flex (group)
		</div>
		<div className="flex min-h-[200px] items-center justify-center bg-gray-300">
			Other flex (group)
		</div>
		<div className="flex min-h-[200px] items-center justify-center bg-gray-300">
			Other flex (group)
		</div>
		<div className="flex min-h-[200px] items-center justify-center bg-gray-300">
			Other flex (group)
		</div>
	</div>
)

const meta = {
	title: "Blocks/Layout/Flex (Group)",
	component: FlexStory,
	tags: ["autodocs"],
	argTypes: {
		backgroundColor: {
			control: { type: "select" },
			options: colorList,
		},
		direction: {
			control: { type: "select" },
			options: directionList,
		},
		justify: {
			control: { type: "select" },
			options: justifyList,
		},
		align: {
			control: { type: "select" },
			options: alignList,
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					"Flex (group) is a layout component that sets a flex layout. It is good for grid to set a row or the colspan and to group and align content. <br> Flex has all the background options of the Section component.",
			},
		},
	},
} satisfies Meta<FlexStoryType>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {
		backgroundColor: "muted",
		backgroundImage: "https://picsum.photos/1200/900",
		colSpan: 1,
		rowSpan: 1,
		gap: 4,
		direction: "col",
		justify: "start",
		align: "start",
		dark: false,
	},
}

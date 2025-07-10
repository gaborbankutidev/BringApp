import type { Meta, StoryObj } from "@storybook/react"

import { textAlignList, type TextAlignType } from "@/editor/utils/lists"
import { colorList } from "@/styles/colors"
import { headingLevelList } from "./heading"
import HeadingBlock, { headingVariantList, type HeadingBlockProps } from "./heading.block"

type HeadingStoryType = Omit<HeadingBlockProps, "source" | "align"> & { align?: TextAlignType }

const HeadingStory = ({ align, ...attributes }: HeadingStoryType) => (
	<HeadingBlock
		attributes={{
			align: { "": align },
			...attributes,
		}}
	/>
)

const meta = {
	title: "Blocks/Heading",
	component: HeadingStory,
	tags: ["autodocs"],
	argTypes: {
		align: {
			control: { type: "select" },
			options: textAlignList,
		},
		color: {
			control: { type: "select" },
			options: colorList,
		},
		level: {
			control: "select",
			options: headingLevelList,
		},
		variant: {
			control: { type: "select" },
			options: headingVariantList,
		},
		title: {
			control: { type: "text" },
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					"Heading is a block that helps to create headings in the editor. The same can be achieved with a markdown block.",
			},
		},
	},
} satisfies Meta<HeadingStoryType>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		title: "Heading",
		level: 1,
		align: undefined,
		color: undefined,
		variant: undefined,
	},
}

export const Level1: Story = {
	args: {
		title: "Heading Level 1",
		level: 1,
		align: undefined,
		color: undefined,
		variant: undefined,
	},
}

export const Level2: Story = {
	args: {
		title: "Heading Level 2",
		level: 2,
		align: undefined,
		color: undefined,
		variant: undefined,
	},
}

export const Level3: Story = {
	args: {
		title: "Heading Level 3",
		level: 3,
		align: undefined,
		color: undefined,
		variant: undefined,
	},
}

export const Level4: Story = {
	args: {
		title: "Heading Level 4",
		level: 4,
		align: undefined,
		color: undefined,
		variant: undefined,
	},
}

export const Level5: Story = {
	args: {
		title: "Heading Level 5",
		level: 5,
		align: undefined,
		color: undefined,
		variant: undefined,
	},
}

export const Level6: Story = {
	args: {
		title: "Heading Level 6",
		level: 6,
		align: undefined,
		color: undefined,
		variant: undefined,
	},
}

export const LevelHl1: Story = {
	args: {
		title: "Heading Level 1 with HL1 variant",
		level: 1,
		align: undefined,
		color: undefined,
		variant: "hl1",
	},
}

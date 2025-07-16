import type { Meta, StoryObj } from "@storybook/react"

import { textAlignList, textSourceList, type TextAlignType } from "@/editor/utils/lists"
import { colorList } from "@/styles/colors"
import { mockEntityProps } from "@/utils/mock-entity-props"
import { mockSiteProps } from "@/utils/mock-site-props"
import { headingLevelList } from "./heading"
import HeadingBlock, { headingVariantList, type HeadingBlockProps } from "./heading.block"

type HeadingStoryType = Omit<HeadingBlockProps, "align"> & { align?: TextAlignType }

const HeadingStory = ({ align, ...attributes }: HeadingStoryType) => (
	<HeadingBlock
		attributes={{
			align: { "": align },
			...attributes,
		}}
		entityProps={mockEntityProps}
		siteProps={mockSiteProps}
	/>
)

const meta = {
	title: "Blocks/Heading",
	component: HeadingStory,
	tags: ["autodocs"],
	argTypes: {
		source: {
			control: { type: "select" },
			options: textSourceList,
		},
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
					"Heading is a block that helps to create headings in the editor. The same can be achieved with a markdown block.<br>In the editor source can be set to manual or dynamic. If it is set to dynamic, the heading will be created from the values entity props (name, excerpt, description, etc.)",
			},
		},
	},
} satisfies Meta<HeadingStoryType>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		source: "manual",
		title: "Heading",
		level: 1,
		align: undefined,
		color: undefined,
		variant: undefined,
	},
}

export const Level1: Story = {
	args: {
		source: "manual",
		title: "Heading Level 1",
		level: 1,
		align: undefined,
		color: undefined,
		variant: undefined,
	},
}

export const Level2: Story = {
	args: {
		source: "manual",
		title: "Heading Level 2",
		level: 2,
		align: undefined,
		color: undefined,
		variant: undefined,
	},
}

export const Level3: Story = {
	args: {
		source: "manual",
		title: "Heading Level 3",
		level: 3,
		align: undefined,
		color: undefined,
		variant: undefined,
	},
}

export const Level4: Story = {
	args: {
		source: "manual",
		title: "Heading Level 4",
		level: 4,
		align: undefined,
		color: undefined,
		variant: undefined,
	},
}

export const Level5: Story = {
	args: {
		source: "manual",
		title: "Heading Level 5",
		level: 5,
		align: undefined,
		color: undefined,
		variant: undefined,
	},
}

export const Level6: Story = {
	args: {
		source: "manual",
		title: "Heading Level 6",
		level: 6,
		align: undefined,
		color: undefined,
		variant: undefined,
	},
}

export const LevelHl1: Story = {
	args: {
		source: "manual",
		title: "Heading Level 1 with HL1 variant",
		level: 1,
		align: undefined,
		color: undefined,
		variant: "hl1",
	},
}

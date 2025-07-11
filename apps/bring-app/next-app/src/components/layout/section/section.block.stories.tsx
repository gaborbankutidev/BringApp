import type { Meta, StoryObj } from "@storybook/react"

import { colorList } from "@/styles/colors"
import { containerSizeList } from "@/styles/container"
import SectionBlock, { type SectionBlockProps } from "./section.block"

type SectionStoryType = Omit<SectionBlockProps, "backgroundImage"> & { backgroundImage: string }

const SectionStory = ({ backgroundImage, ...attributes }: SectionStoryType) => (
	<SectionBlock
		attributes={{
			...attributes,
			backgroundImage: { "": { src: backgroundImage, alt: "", id: 0 } },
		}}
	>
		<div className="flex min-h-[800px] items-center justify-center border border-foreground">
			Content of the section block. Border is set to visualize the container size.
		</div>
	</SectionBlock>
)

const meta = {
	title: "Blocks/Layout/Section",
	component: SectionStory,
	tags: ["autodocs"],
	argTypes: {
		containerSize: {
			control: { type: "select" },
			options: containerSizeList,
		},
		backgroundColor: {
			control: { type: "select" },
			options: colorList,
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					"Section is the top level building block of pages that sets the container (the padding and max with of the content) <br>It can have a background image and color with gradient, parallax effect, and dark mode.",
			},
		},
	},
} satisfies Meta<SectionStoryType>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {
		containerSize: "720",
		backgroundColor: "muted",
		backgroundImage: "https://picsum.photos/1200/900",
		gradient: true,
		parallax: true,
		dark: true,
	},
}

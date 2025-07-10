import type { Meta, StoryObj } from "@storybook/react"

import { textAlignList, type TextAlignType } from "@/editor/utils/lists"
import { colorList } from "@/styles/colors"
// import { variantList } from "./markdown"
import MarkdownBlock, { type MarkdownBlockProps } from "./markdown.block"
import { contentSample } from "./sample-content"

type MarkdownStoryType = Omit<MarkdownBlockProps, "source" | "elementsClassName" | "align"> & {
	align?: TextAlignType
}

const HeadingStory = ({ align, ...attributes }: MarkdownStoryType) => (
	<MarkdownBlock
		attributes={{
			elementsClassName: {},
			align: { "": align },
			...attributes,
		}}
	/>
)

const meta = {
	title: "Blocks/Markdown",
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
		/* 		variant: {
			control: { type: "select" },
			options: variantList,
		}, */
	},
	parameters: {
		docs: {
			description: {
				component:
					"Markdown block is the main building block for rendering content on the website. This is used instead of rich text editor.<br>Cheat sheet: https://www.markdownguide.org/cheat-sheet/",
			},
		},
	},
} satisfies Meta<MarkdownStoryType>

export default meta
type Story = StoryObj<typeof meta>

export const VariantBody: Story = {
	args: {
		content: contentSample,
		align: "left",
		color: "gray-800",
		//variant: "body",
	},
}

export const VariantBlog: Story = {
	args: {
		content: contentSample,
		align: "left",
		color: "gray-800",
		// variant: "blog",
	},
}

export const VariantRaw: Story = {
	args: {
		content: contentSample,
		align: "left",
		color: "gray-800",
		// variant: "raw",
	},
}

export const TextCenter: Story = {
	args: {
		content: contentSample,
		align: "center",
		color: "gray-800",
	},
}

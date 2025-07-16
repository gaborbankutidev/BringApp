import type { Meta, StoryObj } from "@storybook/react"

import { textAlignList, textSourceList, type TextAlignType } from "@/editor/utils/lists"
import { colorList } from "@/styles/colors"
// import { variantList } from "./markdown"
import { mockEntityProps } from "@/utils/mock-entity-props"
import { mockSiteProps } from "@/utils/mock-site-props"
import MarkdownBlock, { type MarkdownBlockProps } from "./markdown.block"
import { contentSample } from "./sample-content"

type MarkdownStoryType = Omit<MarkdownBlockProps, "elementsClassName" | "align"> & {
	align?: TextAlignType
}

const HeadingStory = ({ align, ...attributes }: MarkdownStoryType) => (
	<MarkdownBlock
		attributes={{
			elementsClassName: {},
			align: { "": align },
			...attributes,
		}}
		entityProps={mockEntityProps}
		siteProps={mockSiteProps}
	/>
)

const meta = {
	title: "Blocks/Markdown",
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
		/* 		variant: {
			control: { type: "select" },
			options: variantList,
		}, */
	},
	parameters: {
		docs: {
			description: {
				component:
					"Markdown block is the main building block for rendering content on the website. This is used instead of rich text editor.<br>Cheat sheet: https://www.markdownguide.org/cheat-sheet/<br>In the editor source can be set to manual or dynamic. If it is set to dynamic, the content will be created from the values entity props (name, excerpt, description, etc.)",
			},
		},
	},
} satisfies Meta<MarkdownStoryType>

export default meta
type Story = StoryObj<typeof meta>

export const VariantBody: Story = {
	args: {
		source: "manual",
		content: contentSample,
		align: "left",
		color: "gray-800",
		//variant: "body",
	},
}

export const VariantBlog: Story = {
	args: {
		source: "manual",
		content: contentSample,
		align: "left",
		color: "gray-800",
		// variant: "blog",
	},
}

export const VariantRaw: Story = {
	args: {
		source: "manual",
		content: contentSample,
		align: "left",
		color: "gray-800",
		// variant: "raw",
	},
}

export const TextCenter: Story = {
	args: {
		source: "manual",
		content: contentSample,
		align: "center",
		color: "gray-800",
	},
}

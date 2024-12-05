import type { Meta, StoryObj } from "@storybook/react"
import Markdown from "./markdown";
import {contentSample, inlineContentSample} from "./sample-content";

const meta = {
	title: "Components/Markdown",
	component: Markdown,
	tags: ["autodocs"],
} satisfies Meta<typeof Markdown>

export default meta
type Story = StoryObj<typeof meta>

export const Full: Story = {
	args: {
		content: contentSample,
		className: "md",
	},
}

export const Line: Story = {
	args: {
		content: inlineContentSample,
	},
}

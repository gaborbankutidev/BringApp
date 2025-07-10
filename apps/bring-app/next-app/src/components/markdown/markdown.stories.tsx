import type { Meta, StoryObj } from "@storybook/react"

import Markdown from "./markdown"
import { contentSample, inlineContentSample } from "./sample-content"

const meta = {
	title: "Components/Markdown",
	component: Markdown,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"Markdown component renders markdown content into react components. This is the elegant solution instead of a rich text editor. <br>This component is a configured version of the `react-markdown` library. <br><br>Use Markdown any time you render content from the admin. <br>Markdown inline prop can be used to render only inline elements without any wrapper element.",
			},
		},
	},
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

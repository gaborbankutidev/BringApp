import type { Meta, StoryObj } from "@storybook/react"

import Heading from "./heading"

const meta = {
	title: "Components/Heading",
	component: Heading,
	tags: ["autodocs"],
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const Full: Story = {
	args: {
		children: "Lorem ipsum dolor sit amet",
	},
}

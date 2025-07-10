import type { Meta, StoryObj } from "@storybook/react"

import { sizeList, variantList } from "./button"
import ButtonBlock, { type ButtonBlockProps } from "./button.block"

const ButtonStory = (attributes: ButtonBlockProps) => <ButtonBlock attributes={attributes} />

const meta = {
	title: "Blocks/Button",
	component: ButtonStory,
	tags: ["autodocs"],
	// Added argTypes manually as Storybook can't infer types from union types correctly
	argTypes: {
		variant: {
			control: { type: "select" },
			options: variantList,
		},
		size: {
			control: { type: "radio" },
			options: sizeList,
		},
	},
} satisfies Meta<typeof ButtonStory>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {
		text: "Primary",
		href: "#",
		size: "md",
		variant: "primary",
	},
}

export const Destructive: Story = {
	args: {
		text: "Destructive",
		href: "#",
		newTab: false,
		size: "md",
		variant: "destructive",
	},
}

export const Outline: Story = {
	args: {
		text: "Outline",
		href: "#",
		newTab: false,
		size: "md",
		variant: "outline",
	},
}

export const Secondary: Story = {
	args: {
		text: "Secondary",
		href: "#",
		newTab: false,
		size: "md",
		variant: "secondary",
	},
}

export const Ghost: Story = {
	args: {
		text: "Ghost",
		href: "#",
		newTab: false,
		size: "md",
		variant: "ghost",
	},
}

export const Link: Story = {
	args: {
		text: "Link",
		href: "#",
		newTab: false,
		size: "md",
		variant: "link",
	},
}

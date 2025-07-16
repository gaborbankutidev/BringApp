import type { Meta, StoryObj } from "@storybook/react"

import Button, { sizeList, variantList } from "./button"

const meta = {
	title: "Components/Button",
	component: Button,
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
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {
		children: "Primary",
		size: "md",
		variant: "primary",
		isLoading: false,
		loadingMessage: "Please wait",
		className: "",
	},
}

export const Loading: Story = {
	args: {
		children: "Ready",
		size: "md",
		variant: "primary",
		isLoading: true,
		loadingMessage: "Please wait",
		className: "",
	},
}

export const Destructive: Story = {
	args: {
		variant: "destructive",
		children: "Destructive",
		size: "md",
		isLoading: false,
		loadingMessage: "Please wait",
		className: "",
	},
}

export const Outline: Story = {
	args: {
		variant: "outline",
		children: "Outline",
		size: "md",
		isLoading: false,
		loadingMessage: "Please wait",
		className: "",
	},
}

export const Secondary: Story = {
	args: {
		variant: "secondary",
		children: "Secondary",
		size: "md",
		isLoading: false,
		loadingMessage: "Please wait",
		className: "",
	},
}

export const Ghost: Story = {
	args: {
		variant: "ghost",
		children: "Ghost",
		size: "md",
		isLoading: false,
		loadingMessage: "Please wait",
		className: "",
	},
}

export const Link: Story = {
	args: {
		variant: "link",
		size: "md",
		asChild: true,
		children: <a href="#">Link</a>,
	},
}

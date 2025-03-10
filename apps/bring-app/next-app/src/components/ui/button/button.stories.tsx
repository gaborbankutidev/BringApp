import type { Meta, StoryObj } from "@storybook/react"

import Button from "./button"

const meta = {
	title: "Components/Ui/Button",
	component: Button,
	tags: ["autodocs"],
	// Added argTypes manually as Storybook can't infer types from union types correctly
	argTypes: {
		variant: {
			control: { type: "select" },
			options: ["primary", "destructive", "outline", "secondary", "ghost", "link"],
		},
		size: {
			control: { type: "radio" },
			options: ["sm", "md", "lg", "icon"],
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
	},
}

export const Loading: Story = {
	args: {
		children: "Ready",
		size: "md",
		variant: "primary",
		isLoading: true,
	},
	argTypes: {
		loadingMessage: {
			control: "text",
		},
	},
}

export const Destructive: Story = {
	args: {
		variant: "destructive",
		children: "Destructive",
		size: "md",
	},
}

export const Outline: Story = {
	args: {
		variant: "outline",
		children: "Outline",
		size: "md",
	},
}

export const Secondary: Story = {
	args: {
		variant: "secondary",
		children: "Secondary",
		size: "md",
	},
}

export const Ghost: Story = {
	args: {
		variant: "ghost",
		children: "Ghost",
		size: "md",
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

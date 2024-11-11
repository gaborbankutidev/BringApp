import type {Meta, StoryObj} from "@storybook/react";

import Button from "./button";

const meta = {
	title: "Components/Ui/Button",
	component: Button,
	tags: ["autodocs"],
	// Added argTypes manually as Storybook can't infer types from union types correctly
	argTypes: {
		variant: {
			control: {type: "select"},
			options: [
				"primary",
				"destructive",
				"outline",
				"secondary",
				"ghost",
				"link",
			],
		},
		size: {
			control: {type: "radio"},
			options: ["sm", "md", "lg", "icon"],
		},
		as: {
			control: {type: "radio"},
			options: ["button", "Link"],
		},
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: "Primary",
		size: "md",
		variant: "primary",
		as: "button",
	},
};

export const Destructive: Story = {
	args: {
		variant: "destructive",
		children: "Destructive",
		size: "md",
		as: "button",
	},
};

export const Outline: Story = {
	args: {
		variant: "outline",
		children: "Outline",
		size: "md",
		as: "button",
	},
};

export const Secondary: Story = {
	args: {
		variant: "secondary",
		children: "Secondary",
		size: "md",
		as: "button",
	},
};

export const Ghost: Story = {
	args: {
		variant: "ghost",
		children: "Ghost",
		size: "md",
		as: "button",
	},
};

export const Link: Story = {
	args: {
		variant: "link",
		children: "Link",
		size: "md",
		as: "button",
	},
};

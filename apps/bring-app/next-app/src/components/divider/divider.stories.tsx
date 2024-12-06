import type {Meta, StoryObj} from "@storybook/react";

import DividerBlock from "./divider.block";

const meta = {
	title: "Components/Divider",
	component: DividerBlock,
	tags: ["autodocs"],
} satisfies Meta<typeof DividerBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithLine: Story = {
	args: {
		attributes: {height: 40, withLine: true},
	},
};

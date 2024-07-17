import type {Meta, StoryObj} from "@storybook/react";

import Divider from "./divider";

const meta = {
	title: "Components/Divider",
	component: Divider,
	tags: ["autodocs"],
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithLine: Story = {
	args: {
		height: 40,
		withLine: true,
	},
};

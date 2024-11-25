import type {Meta, StoryObj} from "@storybook/react";
import Column from "./column";

const meta = {
	title: "Layout/Column",
	component: Column,
	tags: ["autodocs"],
} satisfies Meta<typeof Column>;

export default meta;
type Story = StoryObj<typeof Column>;

export const ColorBackground: Story = {
	render: () => (
		<div className="bg-gray-200 p-4">
			<Column className="bg-purple-400">
				<p className="py-8 text-white">This is in the column</p>
				<p className="py-8 text-white">This is in the column</p>
			</Column>
		</div>
	),
};

import type {Meta, StoryObj} from "@storybook/react";
import SplitBlock from "./split.block";

const meta = {
	title: "Layout/Split",
	component: SplitBlock,
	tags: ["autodocs"],
} satisfies Meta<typeof SplitBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		attributes: {className: "gray-200"},
		children: (
			<>
				<div className="bg-purple-400 p-4 text-white">Content 1</div>
				<div className="bg-purple-400 p-4 text-white">Content 2</div>
				<div className="bg-purple-400 p-4 text-white">Content 3</div>
			</>
		),
	},
};

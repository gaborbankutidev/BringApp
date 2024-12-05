
import type {Meta, StoryObj} from "@storybook/react";
import GroupBlock from "./group.block";

const meta = {
	title: "Layout/Group",
	component: GroupBlock,
	tags: ["autodocs"],

} satisfies Meta<typeof GroupBlock>;


export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {
		attributes: {backgroundColor: "gray-200"},
		children: (
			<>
				<div className="bg-purple-400 p-4 text-white">Content 1</div>
				<div className="bg-purple-400 p-4 text-white">Content 2</div>
				<div className="bg-purple-400 p-4 text-white">Content 3</div>
			</>
		),
	},
}

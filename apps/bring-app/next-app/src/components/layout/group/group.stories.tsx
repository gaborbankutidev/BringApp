import type { Meta, StoryObj } from "@storybook/react"
import Group from "./group"

const meta = {
	title: "Layout/Group",
	component: Group,
	tags: ["autodocs"],
} satisfies Meta<typeof Group>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {
		backgroundColor: "grey-200",
		children: (
			<>
				<div className="bg-blue-400 p-4 text-white">Content 1</div>
				<div className="bg-blue-400 p-4 text-white">Content 2</div>
				<div className="bg-blue-400 p-4 text-white">Content 3</div>
			</>
		),
	},
}

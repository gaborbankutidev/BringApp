import type { Meta, StoryObj } from "@storybook/react"
import Split from "./split"

const meta = {
	title: "Layout/Split",
	component: Split,
	tags: ["autodocs"],
} satisfies Meta<typeof Split>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		className: "grey-200",
		children: (
			<>
				<div className="bg-blue-400 p-4 text-white">Content 1</div>
				<div className="bg-blue-400 p-4 text-white">Content 2</div>
				<div className="bg-blue-400 p-4 text-white">Content 3</div>
			</>
		),
	},
}

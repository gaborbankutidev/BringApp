import type { Meta, StoryObj } from "@storybook/react"
import Column from "./column"

const meta = {
	title: "Layout/Column",
	component: Column,
	tags: ["autodocs"],
} satisfies Meta<typeof Column>

export default meta
type Story = StoryObj<typeof Column>

export const ColorBackground: Story = {
	render: () => (
		<div className="bg-grey-200 p-4">
			<Column className="bg-blue-400">
				<p className="py-10 text-white">This is the column</p>
				<p className="py-10 text-white">This is the column</p>
			</Column>
		</div>
	),
}

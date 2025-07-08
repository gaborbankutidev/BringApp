import type { Meta, StoryObj } from "@storybook/react"

import { colors } from "./colors"

const Colors = () => (
	<div className="grid min-h-screen grid-cols-2 gap-0">
		{/* Light Mode Column */}
		<div className="light bg-white p-6">
			<h2 className="text-xl mb-6 font-semibold text-gray-900">Light Mode</h2>
			<div className="space-y-3">
				{Object.keys(colors).map((key) => (
					<div key={key} className="flex items-center space-x-4">
						<div
							className="h-10 w-10 rounded border border-gray-300"
							style={{ backgroundColor: colors[key as keyof typeof colors] }}
						></div>
						<div className="text-sm font-mono text-gray-700">{key}</div>
					</div>
				))}
			</div>
		</div>

		{/* Dark Mode Column */}
		<div className="dark bg-gray-900 p-6">
			<h2 className="text-xl mb-6 font-semibold text-gray-50">Dark Mode</h2>
			<div className="space-y-3">
				{Object.keys(colors).map((key) => (
					<div key={key} className="flex items-center space-x-4">
						<div
							className="h-10 w-10 rounded border border-gray-600"
							style={{ backgroundColor: colors[key as keyof typeof colors] }}
						></div>
						<div className="text-sm font-mono text-gray-300">{key}</div>
					</div>
				))}
			</div>
		</div>
	</div>
)

const meta = {
	title: "StyleGuide/Colors",
	component: Colors,
	tags: ["autodocs"],
} satisfies Meta<typeof Colors>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: Colors,
}

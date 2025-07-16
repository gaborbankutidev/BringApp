import type { Meta, StoryObj } from "@storybook/react"

import { colorList } from "@/styles/colors"
import DividerBlock, { type DividerBlockProps } from "./divider.block"

const meta = {
	title: "Blocks/Divider",
	component: (attributes: DividerBlockProps) => <DividerBlock attributes={attributes} />,
	tags: ["autodocs"],
	argTypes: {
		lineColor: {
			control: { type: "select" },
			options: colorList,
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					"A divider block is for the editor to apply white space or a separator between blocks.",
			},
		},
	},
} satisfies Meta<DividerBlockProps>

export default meta
type Story = StoryObj<typeof meta>

export const WithLine: Story = {
	args: {
		height: 40,
		withLine: true,
		lineColor: undefined,
	},
}

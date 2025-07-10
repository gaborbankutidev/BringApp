import { boxIconList } from "@/utils/box-icons"
import type { Meta, StoryObj } from "@storybook/react"
import DynamicIcon from "./dynamic-icon"

const meta = {
	title: "Components/DynamicIcon",
	component: DynamicIcon,
	tags: ["autodocs"],
	argTypes: {
		icon: {
			control: "select",
			options: boxIconList,
		},
	},
} satisfies Meta<typeof DynamicIcon>

export default meta
type Story = StoryObj<typeof meta>

export const FullSpec: Story = {
	args: {
		icon: "BiPlayCircle",
		size: 64,
		className: "",
	},
}

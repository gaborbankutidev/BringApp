import type { Meta, StoryObj } from "@storybook/react"

import EmbedBlock, { type EmbedBlockProps } from "./embed.block"

const meta = {
	title: "Blocks/Embed",
	component: (attributes: EmbedBlockProps) => <EmbedBlock attributes={attributes} />,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"Embed block helps to embed content in iframe such as Google Maps or Youtube videos in the editor.",
			},
		},
	},
} satisfies Meta<EmbedBlockProps>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {
		url: "https://www.youtube.com/embed/sG8NDw3Tv6c?si=6_P_qkwhH57CLdI8",
		height: 400,
	},
}

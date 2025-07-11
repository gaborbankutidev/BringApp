import type { Meta, StoryObj } from "@storybook/react"

import Image from "./Image"

const meta = {
	title: "Components/Image",
	component: Image,
	tags: ["autodocs"],
} satisfies Meta<typeof Image>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {
		image: {
			src: "https://picsum.photos/seed/picsum/800/600",
			alt: "",
			className: "",
		},
		link: { href: "#" },
		lightbox: false,
		caption: "This is a caption",
		captionClassName: "",
		source: "This is a source",
		sourceClassName: "",
		className: "",
	},
}

import type { Meta, StoryObj } from "@storybook/react"

import ImageBlock, { type ImageBlockProps } from "./image.block"

type ImageStoryType = Omit<ImageBlockProps, "contentSource" | "image" | "link"> & {
	image?: string
	link?: string
}

const ImageStory = ({ image = "", link = "", ...attributes }: ImageStoryType) => (
	<div className="relative overflow-hidden">
		<ImageBlock
			attributes={{
				image: { src: image, alt: "", id: 0 },
				link: { href: link },
				...attributes,
			}}
		/>
	</div>
)

const meta = {
	title: "Blocks/Image",
	component: ImageStory,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"Image block is for the editor add images.<br>Images can have a caption, source.<br>Image can be linked to a URL or can be opened in a lightbox.<br>In the editor source can be set to manual or dynamic. If it is set to dynamic, the image will display the image from the entity props (featured image)",
			},
		},
	},
} satisfies Meta<ImageStoryType>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {
		image: "https://picsum.photos/seed/picsum/800/600",
		caption: "This is a caption",
		source: "This is a source",
		link: "",
		lightbox: false,
	},
}

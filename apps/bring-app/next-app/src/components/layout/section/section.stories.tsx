import { containerSizeList } from "@/styles/container"
import type { Meta, StoryObj } from "@storybook/react"
import Section from "./section"

const meta = {
	title: "Components/Layout/Section",
	component: ({ children, ...props }) => (
		<Section {...props}>
			<div className="flex min-h-[400px] items-center justify-center border border-foreground">
				{children}
			</div>
		</Section>
	),
	tags: ["autodocs"],
	argTypes: {
		containerSize: {
			control: { type: "select" },
			options: containerSizeList,
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					"Section is the top level building block of pages that sets the container. It sets the padding and max width of the content<br>It can have a background image, parallax effect, and dark mode. <br>Color themes can be edited in the global.css file.",
			},
		},
	},
} satisfies Meta<typeof Section>

export default meta
type Story = StoryObj<typeof meta>

export const BackgroundColor: Story = {
	args: {
		containerSize: "720",
		children: "This is the section with light background color",
		backgroundImage: undefined,
		parallax: false,
		dark: false,

		className: "",
		backgroundImageClassName: "",
		backgroundClassName: "bg-gray-300",
		containerClassName: "",
	},
}

export const BackgroundImage: Story = {
	args: {
		children: "This is the section with light gold background color",
		backgroundImage: {
			src: "https://picsum.photos/1200/900",
			alt: "background image",
		},
		parallax: false,
		dark: false,

		className: "",
		backgroundImageClassName: "",
		backgroundClassName: "",
		containerClassName: "",
	},
}

export const BackgroundImageOverlay: Story = {
	args: {
		children: "This is the section with purple background color",
		backgroundImage: {
			src: "https://picsum.photos/1200/900",
			alt: "background image",
		},
		parallax: false,
		dark: true,

		className: "",
		backgroundImageClassName: "",
		backgroundClassName: "bg-purple-400",
		containerClassName: "text-foreground",
	},
}

export const BackgroundImageOverlayParallax: Story = {
	args: {
		children: "This is the section with purple background color, image and parallax",
		backgroundImage: {
			src: "https://picsum.photos/1200/900",
			alt: "background image",
		},
		parallax: true,
		dark: true,

		className: "",
		backgroundImageClassName: "",
		backgroundClassName: "bg-purple-400",
		containerClassName: "text-foreground",
	},
}

export const BackgroundImageGradientOverlayParallax: Story = {
	args: {
		children: "This is the section with purple gradient background color, image and parallax",
		backgroundImage: {
			src: "https://picsum.photos/1200/900",
			alt: "background image",
		},
		parallax: true,
		dark: true,

		className: "",
		backgroundImageClassName: "",
		backgroundClassName: "bg-gradient-to-b from-purple-400",
		containerClassName: "text-foreground",
	},
}

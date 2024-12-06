import type {Meta, StoryObj} from "@storybook/react";

import Image from "./image";

const meta = {
	title: "Components/Image",
	component: Image,
	tags: ["autodocs"],
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		image: {
			src: "https://picsum.photos/seed/picsum/800/600",
			alt: "placeholder",
			width: 600,
			height: 400,
		},
	},
};

export const BasicWithLightbox: Story = {
	args: {
		image: {
			src: "https://picsum.photos/seed/picsum/800/600",
			alt: "placeholder",
			width: 600,
			height: 400,
		},
		lightbox: true,
	},
};

export const WithLink: Story = {
	args: {
		image: {
			src: "https://picsum.photos/seed/picsum/800/600",
			alt: "placeholder",
			width: 600,
			height: 400,
		},
		link: {
			href: "https://eld.hu",
		},
	},
};

export const WithCaption: Story = {
	args: {
		image: {
			src: "https://picsum.photos/seed/picsum/800/600",
			alt: "placeholder",
			width: 600,
			height: 400,
		},
		caption: "This is a caption",
	},
};

export const WithSource: Story = {
	args: {
		image: {
			src: "https://picsum.photos/seed/picsum/800/600",
			alt: "placeholder",
			width: 600,
			height: 400,
		},
		source: "This is a source",
	},
};

export const WithCaptionAndSource: Story = {
	args: {
		image: {
			src: "https://picsum.photos/seed/picsum/800/600",
			alt: "placeholder",
			width: 600,
			height: 400,
		},
		caption: "This is a caption",
		source: "This is a source",
	},
};

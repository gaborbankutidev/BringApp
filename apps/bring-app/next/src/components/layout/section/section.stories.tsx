import type {Meta, StoryObj} from "@storybook/react";

import Section from "./section";

const meta = {
	title: "Layout/Section",
	component: Section,
	tags: ["autodocs"],
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BackgroundColor: Story = {
	args: {
		backgroundClassName: "bg-base-100",
		children: (
			<div className="flex min-h-[400px] items-center justify-center">
				This is the section with light background color
			</div>
		),
		dark: false,
	},
};

export const BackgroundImage: Story = {
	render: () => (
		<Section
			className="p-4"
			backgroundImage={{
				src: "https://eld.hu/wp-content/uploads/eld-fooldal-hatter-1.jpg",
				alt: "background image",
			}}
		>
			<div className="flex min-h-[400px] items-center justify-center text-white">
				This is the section with light gold background color
			</div>
		</Section>
	),
};

export const BackgroundImageOverlay: Story = {
	render: () => (
		<Section
			className="p-4"
			backgroundImage={{
				src: "https://eld.hu/wp-content/uploads/eld-fooldal-hatter-1.jpg",
				alt: "background image",
			}}
			backgroundClassName="bg-blue-600 opacity-50"
		>
			<div className="flex min-h-[400px] items-center justify-center text-white">
				This is the section with light gold background color
			</div>
		</Section>
	),
};

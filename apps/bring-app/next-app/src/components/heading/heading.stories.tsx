import type { Meta, StoryObj } from "@storybook/react"

import Heading, { headingLevelList } from "./heading"

const meta = {
	title: "Components/Heading",
	component: Heading,
	tags: ["autodocs"],
	argTypes: {
		children: {
			control: "text",
		},
		level: {
			control: "select",
			options: headingLevelList,
		},
		className: {
			control: "text",
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					"Heading is a component that helps to create headings in the editor. The same can be achieved with a markdown block.<br>Technically it could be only a block as for heading you can use the default h1, h2, h3, h4, h5, h6 tags.<br>However if your project requires a more complex heading with subtitle or other elements, you can customize this component.",
			},
		},
	},
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		children: "Lorem ipsum dolor sit amet",
		level: 2,
		className: "",
	},
}

export const Level1: Story = {
	args: {
		children: "Heading Level 1",
		level: 1,
		className: "",
	},
}

export const Level2: Story = {
	args: {
		children: "Heading Level 2",
		level: 2,
		className: "",
	},
}

export const Level3: Story = {
	args: {
		children: "Heading Level 3",
		level: 3,
		className: "",
	},
}

export const Level4: Story = {
	args: {
		children: "Heading Level 4",
		level: 4,
		className: "",
	},
}

export const Level5: Story = {
	args: {
		children: "Heading Level 5",
		level: 5,
		className: "",
	},
}

export const Level6: Story = {
	args: {
		children: "Heading Level 6",
		level: 6,
		className: "",
	},
}

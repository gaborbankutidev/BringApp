import type {Meta, StoryObj} from "@storybook/react";

import Button, {type ButtonTheme} from "./button";

const meta = {
	title: "Components/Button",
	component: Button,
	tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const Buttons = ({size}: ButtonTheme) => (
	<>
		<Button size={size}>Label</Button>
		<Button size={size} arrow>
			Label
		</Button>
		<Button size={size} variant="outlined">
			Label
		</Button>
		<Button size={size} variant="outlined" arrow>
			Label
		</Button>
		<Button size={size} variant="text">
			Label
		</Button>
	</>
);

export const Primary: Story = {
	args: {size: "md"},
	render: (args) => (
		<div className="flex">
			<div className="bg-base-100 flex flex-col gap-8 p-8">
				<Buttons {...args} />
			</div>
			<div className="bg-base-300 flex flex-col gap-8 p-8">
				<Buttons {...args} />
			</div>
			<div
				className="bg-base-300 flex flex-col gap-8 p-8"
				data-theme="eld-dark"
			>
				<Buttons {...args} />
			</div>
			<div
				className="bg-base-100 flex flex-col gap-8 p-8"
				data-theme="eld-dark"
			>
				<Buttons {...args} />
			</div>
		</div>
	),
};

export const Size: Story = {
	render: () => (
		<div className="flex">
			<div className="bg-base-100 flex flex-col gap-8 p-8">
				<Buttons size="md" />
			</div>
			<div className="bg-base-300 flex flex-col gap-8 p-8">
				<Buttons size="sm" />
			</div>
		</div>
	),
};

import type {Meta, StoryObj} from "@storybook/react";
import Row from "./row";

const meta = {
	title: "Layout/Row",
	component: Row,
	tags: ["autodocs"],
} satisfies Meta<typeof Row>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Screen720: Story = {
	render: () => (
		<div className="bg-grey-200 py-4">
			<Row size="720" className="bg-grey-300">
				This is the row
			</Row>
		</div>
	),
};

export const Screen1040: Story = {
	render: () => (
		<div className="bg-grey-200 py-4">
			<Row size="1040" className="bg-grey-300">
				This is the row
			</Row>
		</div>
	),
};

export const Screen1200: Story = {
	render: () => (
		<div className="bg-grey-200 py-4">
			<Row size="1200" className="bg-grey-300">
				This is the row
			</Row>
		</div>
	),
};

export const ScreenWide: Story = {
	render: () => (
		<div className="bg-grey-200 py-4">
			<Row size="wide" className="bg-grey-300">
				This is the row
			</Row>
		</div>
	),
};

export const ScreenFull: Story = {
	render: () => (
		<div className="bg-grey-200 py-4">
			<Row size="full" className="bg-grey-300">
				This is the row
			</Row>
		</div>
	),
};

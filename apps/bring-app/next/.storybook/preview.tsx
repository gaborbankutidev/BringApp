import "@/styles/globals.css";
import type {Preview} from "@storybook/react";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	/* 
	TODO Add decorators - providers, default styles, etc.
	decorators: [
		(Story) => (
			<div
				style={{
					backgroundColor: "rgb(17 24 39)",
					padding: "1em",
					borderRadius: "4px",
				}}
			>
				<Story />
			</div>
		),
	], */
};

export default preview;

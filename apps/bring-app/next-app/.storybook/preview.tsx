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
	/* Add decorators - providers, default styles, etc.
	decorators: [
		(Story) => (
			<Providers>
				<Story />
			</Providers>
		),
	], */
};

export default preview;

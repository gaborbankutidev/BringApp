import "@/styles/globals.css"
import type { Preview } from "@storybook/react"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	style: ["normal", "italic"],
	subsets: ["latin", "latin-ext"],
})

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		backgrounds: {
			default: "light",
			values: [
				{ name: "Light", value: "light" },
				{ name: "Dark", value: "dark" },
			],
		},
	},
	decorators: [
		(Story, context) => {
			const background = context.globals.backgrounds?.value || "light"
			return (
				<div className={`${background} min-h-screen bg-background ${montserrat.className}`}>
					<Story />
				</div>
			)
		},
	],
}

export default preview

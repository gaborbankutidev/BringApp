import forms from "@tailwindcss/forms"
import typography from "@tailwindcss/typography"
import { type Config } from "tailwindcss"
import animate from "tailwindcss-animate"
import { colors } from "./src/styles/colors"
import { generateFontSizeList } from "./src/styles/fonts"
import { generateSafelist } from "./src/styles/safelist"

export default {
	darkMode: ["class"],
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		/*
		 * We rather recommend to override default colors then to extend them
		 * This way you can ensure that the colors are used outside of the design system
		 */
		colors,
		fontSize: generateFontSizeList(),
	},
	safelist: generateSafelist(),
	plugins: [forms, typography, animate],
} satisfies Config

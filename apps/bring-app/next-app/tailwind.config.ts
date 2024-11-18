import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import {type Config} from "tailwindcss";
import animate from "tailwindcss-animate";

import {colorsLight} from "./src/styles";

const breakpoints = ["", "md:", "lg:"];
const sides = ["t", "b", "l", "r"];

const colorPrefixes = [
	"text-",
	"bg-",
	"border-",
	"hover:bg-",
	"hover:text-",
	"focus:border-",
];
const gridPrefixes = ["col-span-", "row-span-", "grid-cols-"];

const classNames = [
	//flex items
	"justify-start",
	"justify-center",
	"justify-end",
	"justify-between",
	"items-start",
	"items-center",
	"items-end",
	// bg size
	"bg-auto",
	"bg-cover",
	"bg-contain",
	// text align
	"text-left",
	"text-right",
	"text-center",
	"text-justify",
	// border
	"border",
	"border-t",
	"border-b",
	"border-l",
	"border-r",
	// max width
	"max-w-[420px]",
	"max-w-[600px]",
	"max-w-[720px]",
	"max-w-[800px]",
];

// Font sizes
const fontSizes = [10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 26, 28];
const lineHeights = [
	{value: 1, label: "xs"},
	{value: 1.2, label: "s"},
	{value: 1.5, label: ""}, // default
	{value: 1.7, label: "l"},
];

const generateFontSizeList = () => {
	const generatedFontSizes: Record<string, [string, string]> = {};
	fontSizes.forEach((fontSize) => {
		lineHeights.forEach((lineHeight) => {
			generatedFontSizes[`${fontSize}${lineHeight.label}`] = [
				`${fontSize}px`,
				`${lineHeight.value}em`,
			];
		});
	});
	return generatedFontSizes;
};

const generateSafelist = () => {
	const safelist: string[] = [];

	// generate color combinations
	Object.keys(colorsLight).forEach((color) => {
		colorPrefixes.forEach((colorPrefix) => {
			safelist.push(`${colorPrefix}${color}`);
		});
	});

	// generate grid combinations
	for (let i = 1; i <= 12; i++) {
		breakpoints.forEach((breakpoint) => {
			gridPrefixes.forEach((gridPrefix) => {
				safelist.push(`${breakpoint}${gridPrefix}${i}`);
			});
		});
	}

	// generate spacing combinations
	breakpoints.forEach((breakpoint) => {
		sides.forEach((side) => {
			for (let i = 1; i <= 16; i++) {
				safelist.push(`${breakpoint}m${side}-${i}`);
				safelist.push(`${breakpoint}p${side}-${i}`);
				safelist.push(`${breakpoint}gap-${i}`);
			}
			for (let i = 16; i <= 64; i = i + 4) {
				safelist.push(`${breakpoint}m${side}-${i}`);
				safelist.push(`${breakpoint}p${side}-${i}`);
				safelist.push(`${breakpoint}gap-${i}`);
			}
		});
	});

	// responsive safelist items
	breakpoints.forEach((breakpoint) => {
		["hidden", "block", "flex", "grid"].forEach((display) =>
			safelist.push(`${breakpoint}${display}`),
		);
	});

	safelist.push(...classNames);

	return safelist;
};

export default {
	darkMode: ["class"],
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		fontSize: generateFontSizeList(),
		extend: {
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					"1": "hsl(var(--chart-1))",
					"2": "hsl(var(--chart-2))",
					"3": "hsl(var(--chart-3))",
					"4": "hsl(var(--chart-4))",
					"5": "hsl(var(--chart-5))",
				},
			},
		},
	},
	safelist: generateSafelist(),
	plugins: [forms, typography, animate],
} satisfies Config;
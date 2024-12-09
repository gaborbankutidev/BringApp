import { BlockStyles, ResponsiveLabels } from "./types"

export const blockStylesDefaultValue: BlockStyles = {
	spacing: {
		m: {
			t: {},
			b: {},
			l: {},
			r: {},
		},
		p: {
			t: {},
			b: {},
			l: {},
			r: {},
		},
	},
	visibility: {},
}

export const sideLabels = {
	t: "top",
	b: "bottom",
	l: "left",
	r: "right",
}

export const spacingLabels = {
	m: "Margin",
	p: "Padding",
}

export const screenSizes: ResponsiveLabels = {
	"": {
		label: "Mobile",
		icon: "smartphone",
	},
	md: {
		label: "Tablet",
		icon: "tablet",
	},
	lg: {
		label: "Desktop",
		icon: "laptop",
	},
}

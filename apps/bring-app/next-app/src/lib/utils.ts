import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Extend twMerge
type AdditionalClassGroupIds = "heading" | "theme"
const fontSizeClassGroupCheck = (classPart: string) => /^[1-9][0-9]*[a-z]*$/.test(classPart)

const twMerge = extendTailwindMerge<AdditionalClassGroupIds>({
	extend: {
		classGroups: {
			// Extend with heading and headline utility classes.
			heading: ["h1", "h2", "h3", "h4", "h5", "h6", "hl1", "hl2"],
			// Override font-size to work with text-20, text-20s, etc.
			"font-size": [{ text: [fontSizeClassGroupCheck] }],
			theme: ["light", "dark", "theme-unset"],
		},
	},
})

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

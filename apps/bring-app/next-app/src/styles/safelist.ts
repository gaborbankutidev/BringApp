import { colors } from "./colors"

/**
 * Generate Tailwind CSS safelist
 * As the content is built in WordPress so the used CSS classes are not known at the build time.
 * Classes used by the blocks must be added to the safelist.
 */

// Breakpoint for responsive classes
const breakpoints = ["", "md:", "lg:"]

// Sides for margin, padding
const sides = ["t", "b", "l", "r"]

// Prefixes for color classes
const colorPrefixes = ["bg-", "border-", "hover:bg-", "hover:text-"]

// Prefixes for responsive color classes
const responsiveColorPrefixes = ["text-"]

// Prefixes for grid classes
const gridPrefixes = ["col-span-", "row-span-", "grid-cols-"]

// Class list that is added to the safelist
const classNames = [
	// bg size
	"bg-auto",
	"bg-cover",
	"bg-contain",
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
]

// Class list that is responsively added to the safelist
const responsiveClassNames = [
	// display
	"hidden",
	"block",
	"flex",
	"grid",
	//flex items
	"justify-start",
	"justify-center",
	"justify-end",
	"justify-between",
	"items-start",
	"items-center",
	"items-end",
	// text align
	"text-left",
	"text-right",
	"text-center",
	"text-justify",
]

export const generateSafelist = () => {
	const safelist: string[] = []

	// generate color combinations
	Object.keys(colors).forEach((color) => {
		colorPrefixes.forEach((colorPrefix) => {
			safelist.push(`${colorPrefix}${color}`)
		})
	})

	// generate responsive color combinations
	breakpoints.forEach((breakpoint) => {
		Object.keys(colors).forEach((color) => {
			responsiveColorPrefixes.forEach((colorPrefix) => {
				safelist.push(`${breakpoint}${colorPrefix}${color}`)
			})
		})
	})

	// generate grid combinations
	for (let i = 1; i <= 12; i++) {
		breakpoints.forEach((breakpoint) => {
			gridPrefixes.forEach((gridPrefix) => {
				safelist.push(`${breakpoint}${gridPrefix}${i}`)
			})
		})
	}

	// generate spacing combinations
	breakpoints.forEach((breakpoint) => {
		sides.forEach((side) => {
			for (let i = 1; i <= 16; i++) {
				safelist.push(`${breakpoint}m${side}-${i}`)
				safelist.push(`${breakpoint}p${side}-${i}`)
				safelist.push(`${breakpoint}gap-${i}`)
			}
			for (let i = 16; i <= 64; i = i + 4) {
				safelist.push(`${breakpoint}m${side}-${i}`)
				safelist.push(`${breakpoint}p${side}-${i}`)
				safelist.push(`${breakpoint}gap-${i}`)
			}
		})
	})

	// class names
	safelist.push(...classNames)

	// responsive class names
	breakpoints.forEach((breakpoint) => {
		responsiveClassNames.forEach((className) => safelist.push(`${breakpoint}${className}`))
	})

	return safelist
}

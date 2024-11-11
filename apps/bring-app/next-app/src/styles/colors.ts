export const colorsByName = {
	// brand
	"blue-900": "#0B2037",
	"blue-600": "#1F3854",
	"blue-400": "#8ABADD",
	"blue-300": "#B7E1FF",
	"blue-grey": "#B7C8D4",
	"blue-grey-light": "#DAE3EA",

	brick: "#BA481B",
	"brick-800": "#BA481B", // dark brick
	"brick-600": "#BA481B", // same as brick

	orange: "#F88558",
	"orange-300": "#F88558", // same as orange
	"orange-200": "#FFB193",
	// grey
	"grey-900": "#08090A",
	"grey-800": "#4F4F4F",
	"grey-700": "#6C6C6C",
	"grey-600": "#858585",
	"grey-400": "#E0E0E0",
	"grey-300": "#EEEEEE",
	"grey-200": "#F8F8F8",
	"grey-100": "#FAFAFA",
	// basic
	white: "#FFFFFF",
	black: "#000000",
	transparent: "transparent",
	red: "#D70F0F",
}

/**
 * Use the named colors to create dynamic color scheme for different purposes
 *
 * Example
 * text-blue is always blue
 * text-primary is blue or white depending on the theme
 *
 * TODO update to sample colors instead of ELD colors
 * TODO add dynamic color logic
 */
export const colorsByPurpose = {
	light: {
		primary: colorsByName["blue-600"],
		secondary: colorsByName["brick-600"],
		"secondary-focus": colorsByName["orange-300"],
		accent: colorsByName["brick-600"],
		"accent-focus": colorsByName["orange-300"],
		neutral: colorsByName["grey-800"],
		"base-100": colorsByName["grey-100"],
		"base-300": colorsByName["grey-300"],
	},
	dark: {
		primary: colorsByName["blue-300"],
		secondary: colorsByName["blue-300"],
		"secondary-focus": colorsByName.white,
		accent: colorsByName["orange-300"],
		"accent-focus": colorsByName["orange-200"],
		neutral: colorsByName.white,
		"base-100": colorsByName["blue-900"],
		"base-300": colorsByName["blue-600"],
	},
}

export const colorsLight = {
	...colorsByName,
	...colorsByPurpose.light,
}
export const colorsDark = {
	...colorsByName,
	...colorsByPurpose.light,
}

export const colorList = Object.keys(colorsByName)

export type ColorType = keyof typeof colorsLight

const colors = { common: colorsByName, ...colorsByPurpose }
export default colors

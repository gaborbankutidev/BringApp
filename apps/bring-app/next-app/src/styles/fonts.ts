/**
 * Define the font sizes and line heights for the project.
 * Use text-20 as the default line height and text-20s, text-20l for smaller and larger line heights.
 * In general we recommend that
 * - the default for the body text line height
 * - small for headers
 * - large probably for very long blocks of text such as blog post content
 * This approach helps to get a consistent look and feel across the project.
 *
 * Do not forget to update twMerge config in libs/utils in case you override this logic.
 */
const fontSizes = [10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 26, 28]
const lineHeights = [
	{ value: 1, label: "xs" },
	{ value: 1.2, label: "s" },
	{ value: 1.5, label: "" }, // default
	{ value: 1.7, label: "l" },
]

export const generateFontSizeList = () => {
	const generatedFontSizes: Record<string, [string, string]> = {}
	fontSizes.forEach((fontSize) => {
		lineHeights.forEach((lineHeight) => {
			generatedFontSizes[`${fontSize}${lineHeight.label}`] = [
				`${fontSize}px`,
				`${lineHeight.value}em`,
			]
		})
	})
	return generatedFontSizes
}

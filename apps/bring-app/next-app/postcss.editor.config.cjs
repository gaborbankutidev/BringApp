const config = {
	plugins: {
		tailwindcss: { config: "./tailwind-editor.config.ts" },
		autoprefixer: {},
		"postcss-prefix-selector": {
			prefix: ".bring-editor",
			/**
			 * Transform function for postcss-prefix-selector
			 * @param {string} prefix - The prefix to apply
			 * @param {string} selector - The original CSS selector
			 * @param {string} prefixedSelector - The prefixed selector
			 * @returns {string} The transformed selector
			 */
			transform(prefix, selector, prefixedSelector) {
				if (selector.startsWith(":root")) {
					return selector
				}
				if (selector.startsWith("html") || selector.startsWith("body")) {
					return selector + " " + prefix
				}
				return prefixedSelector
			},
			exclude: [".bring-editor"],
		},
	},
}

module.exports = config

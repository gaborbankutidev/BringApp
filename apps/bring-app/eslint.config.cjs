const { resolve } = require("node:path")
const project = resolve(__dirname, "tsconfig.json")

/** @type {import("eslint").Linter.Config} */
const bringLibConfig = [
	{
		languageOptions: {
			parserOptions: { project },
			globals: { JSX: true },
		},
		settings: {
			"import/resolver": {
				typescript: { project },
			},
		},
		rules: {
			"import/no-default-export": "off",
		},
		files: ["**.ts", "**.tsx", "**.*js", "**.jsx"],
	},
	{
		ignores: ["**/node_modules/", "**/.yarn/", "**/build/", "**/dist/", "**/wordpress/"],
	},
]

module.exports = [...bringLibConfig]

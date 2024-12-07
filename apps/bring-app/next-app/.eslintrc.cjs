/** @type {import("eslint").Linter.Config} */
const config = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "./tsconfig.json",
	},
	// @ts-ignore
	plugins: ["@typescript-eslint", "eslint-plugin-react-hooks"],
	extends: [
		"next/core-web-vitals",
		"plugin:@typescript-eslint/recommended-type-checked",
		"plugin:@typescript-eslint/stylistic-type-checked",
		"plugin:storybook/recommended",
	],
	rules: {
		// These opinionated rules are enabled in stylistic-type-checked above.
		// Feel free to reconfigure them to your own preference.
		"@typescript-eslint/array-type": "off",
		"@typescript-eslint/consistent-type-definitions": "off",
		"@typescript-eslint/dot-notation": "off",

		"@typescript-eslint/consistent-type-imports": [
			"warn",
			{
				prefer: "type-imports",
				fixStyle: "inline-type-imports",
			},
		],
		"@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
		"@typescript-eslint/no-misused-promises": [
			2,
			{
				checksVoidReturn: { attributes: false },
			},
		],
		// To allow @ts-ignore without a warning or error
		"@typescript-eslint/ban-ts-comment": "off",
	},
	ignorePatterns: ["process-mock.js", "webpack.editor.config.js", "node_modules/", ".eslintrc.cjs"],
}

module.exports = config

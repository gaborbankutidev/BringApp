const {resolve} = require("node:path");
const project = resolve(__dirname, "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
const config = [
	{
		languageOptions: {
			parserOptions: {project},
			globals: {JSX: true},
		},
		settings: {
			"import/resolver": {
				typescript: {project},
			},
		},
		ignores: ["dist"],
		rules: {
			"import/no-default-export": "off",
			// Add any additional rules here
		},
	},
];

module.exports = config;

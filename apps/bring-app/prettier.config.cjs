const config = {
	plugins: [
		"@prettier/plugin-php",
		"prettier-plugin-tailwindcss",
		"prettier-plugin-organize-imports",
		"prettier-plugin-pkg",
	],
	arrowParens: "always",
	bracketSpacing: false,
	endOfLine: "lf",
	htmlWhitespaceSensitivity: "css",
	bracketSameLine: false,
	jsxSingleQuote: false,
	printWidth: 80,
	proseWrap: "preserve",
	quoteProps: "as-needed",
	semi: true,
	singleQuote: false,
	tabWidth: 2,
	trailingComma: "all",
	useTabs: true,

	phpVersion: "8.2",
	trailingCommaPHP: true,
	braceStyle: "1tbs",

	tailwindConfig: "./next-app/tailwind.config.ts",
	tailwindFunctions: ["twJoin", "twMerge"],
};

module.exports = config;

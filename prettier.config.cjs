module.exports = {
	plugins: [
		"@prettier/plugin-php",
		"prettier-plugin-tailwindcss",
		"prettier-plugin-organize-imports",
		"prettier-plugin-pkg",
	],
	arrowParens: "always",
	bracketSameLine: false,
	bracketSpacing: false,
	endOfLine: "lf",
	htmlWhitespaceSensitivity: "css",
	jsxSingleQuote: false,
	printWidth: 100,
	proseWrap: "preserve",
	quoteProps: "as-needed",
	semi: true,
	singleQuote: false,
	tabWidth: 4,
	trailingComma: "all",
	useTabs: true,

	phpVersion: "8.2",
	trailingCommaPHP: true,
	braceStyle: "1tbs",

	tailwindConfig: "./apps/bring-app/next-app/tailwind.config.ts",
	tailwindFunctions: ["twJoin", "twMerge"],
};

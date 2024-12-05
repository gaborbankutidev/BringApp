import { defineConfig } from "tsup"

export default defineConfig({
	entry: [
		"src/index.ts",
		"src/blocks/index.ts",
		"src/components/index.tsx",
		"src/controls/index.ts",
		"src/hooks/index.ts",
		"src/styles/index.ts",
		"src/types.ts",
		"src/utils.ts",
	],
	format: ["cjs", "esm"],
	external: [
		"@wordpress/blocks",
		"@wordpress/block-editor",
		"@wordpress/components",
		"@wordpress/data",
		"react",
		"react-dom",
	],
	minify: false,
	dts: true,
	clean: true,
	outExtension({ format }) {
		return {
			js: `.${format}.js`,
		}
	},
})

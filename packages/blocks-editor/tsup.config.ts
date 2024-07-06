import {defineConfig} from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["cjs", "esm"],
	external: [
		"@wordpress/blocks",
		"@wordpress/block-editor",
		"@wordpress/components",
		"@wordpress/data",
		"react",
		"react-dom",
	],
	minify: true,
	dts: true,
	clean: true,
	outExtension({format}) {
		return {
			js: `.${format}.js`,
		};
	},
});

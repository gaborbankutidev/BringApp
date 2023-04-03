import {defineConfig} from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["cjs", "esm"],
	external: ["@bring/blocks-client"],
	minify: true,
	dts: true,
	clean: true,
	outExtension({format}) {
		return {
			js: `.${format}.js`,
		};
	},
});

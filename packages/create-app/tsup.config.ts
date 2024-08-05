import {defineConfig} from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm"],

	minify: true,
	dts: false,
	clean: true,
	target: "node20",
	outExtension: () => {
		return {js: ".js"};
	},
});

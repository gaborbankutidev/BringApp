import { defineConfig } from "tsup"

export default defineConfig({
	entry: [
		"src/index.ts",
		"src/utils.ts",
		"src/init-client.tsx",
		"src/init-render.tsx",
		"src/init-server.tsx",
		"src/types.ts",
		"src/content/index.ts",
		"src/components/index.ts",
		"src/hooks/index.ts",
		"src/rank-math/index.ts",
		"src/styles/index.ts",
	],
	format: ["cjs", "esm"],
	external: ["react", "react-dom"],
	minify: false,
	dts: true,
	clean: true,
	outExtension({ format }) {
		return {
			js: `.${format}.js`,
		}
	},
})

import type { StorybookConfig } from "@storybook/nextjs"

import path, { dirname, join } from "path"

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
	return dirname(require.resolve(join(value, "package.json")))
}
const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

	addons: [
		getAbsolutePath("@storybook/addon-links"),
		getAbsolutePath("@storybook/addon-essentials"),
		getAbsolutePath("@storybook/addon-onboarding"),
		getAbsolutePath("@storybook/addon-interactions"),
		"@chromatic-com/storybook",
	],

	// staticDirs: ["../public"], // Add public directory to Storybook

	framework: {
		name: getAbsolutePath("@storybook/nextjs"),
		options: {},
	},

	docs: {},

	// previewHead: (head) => `${head}`, // Add tags to head

	typescript: {
		reactDocgen: "react-docgen-typescript",
	},

	webpackFinal: async (config) => {
		// Ensure resolve.alias exists
		if (!config.resolve) {
			config.resolve = {}
		}
		if (!config.resolve.alias) {
			config.resolve.alias = {}
		}

		// Replace the server module with mocks for Storybook
		const mockPath = path.resolve(__dirname, "mocks.ts")
		const serverPath = path.resolve(__dirname, "../src/bring/server")

		// Try multiple alias approaches
		Object.assign(config.resolve.alias, {
			"@/bring/server": mockPath,
			[serverPath]: mockPath,
			[`${serverPath}.ts`]: mockPath,
			[`${serverPath}/index`]: mockPath,
			[`${serverPath}/index.ts`]: mockPath,
		})

		return config
	},
}
export default config

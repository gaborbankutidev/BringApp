/**
 * External Dependencies
 */
const path = require("path");
const webpack = require("webpack");

// @ts-ignore
const defaultConfig = require("@wordpress/scripts/config/webpack.config.js");
const editorConfig = {...defaultConfig};

/**
 * Add aliases for the editor
 *
 * @/bring/client overrides the url in client hooks so that can work in the editor
 * @/bring/server overrides the server side functions such as getEntityProps with its client side hook versions
 *
 * next/image and next/link are replaced with custom components that work in the editor
 */
editorConfig.resolve.alias = {
	...editorConfig.resolve.alias,
	"@/bring/client": path.resolve(__dirname, "src/editor/bring/client"),
	"@/bring/server": path.resolve(__dirname, "src/editor/bring/server"),
	"@": path.resolve(__dirname, "./src/"),
	"next/image": path.resolve(__dirname, "src/editor/components/next-image.tsx"),
	"next/link": path.resolve(__dirname, "src/editor/components/next-link.tsx"),
};

// Add process mock to WordPress editor
editorConfig.plugins = [
	...editorConfig.plugins,
	new webpack.ProvidePlugin({
		process: path.resolve(__dirname, "process-mock.js"),
	}),
];

module.exports = editorConfig;

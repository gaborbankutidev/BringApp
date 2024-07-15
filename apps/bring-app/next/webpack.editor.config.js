/**
 * External Dependencies
 */
const path = require("path");
const webpack = require("webpack");

/**
 * WordPress Dependencies
 */
// @ts-ignore
const defaultConfig = require("@wordpress/scripts/config/webpack.config.js");
const newConfig = {...defaultConfig};

newConfig.resolve.alias = {
	...newConfig.resolve.alias,
	"@/bring/client": path.resolve(__dirname, "src/editor/bring/client"),
	"@/bring/server": path.resolve(__dirname, "src/editor/bring/server"),
	"@": path.resolve(__dirname, "./src/"),
	"next/image": path.resolve(__dirname, "src/editor/components/next-image.tsx"),
	"next/link": path.resolve(__dirname, "src/editor/components/next-link.tsx"),
};

newConfig.plugins = [
	...newConfig.plugins,
	new webpack.ProvidePlugin({
		process: path.resolve(__dirname, "process-mock.js"),
	}),
];

module.exports = newConfig;

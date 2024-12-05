/**
 * External Dependencies
 */
const path = require("path")
const webpack = require("webpack")

/**
 * WordPress Dependencies
 */
// @ts-ignore
const defaultConfig = require("@wordpress/scripts/config/webpack.config.js")
const editorConfig = { ...defaultConfig }

editorConfig.resolve.alias = {
	...editorConfig.resolve.alias,
	"@/bring/client": path.resolve(__dirname, "src/editor/bring/client"),
	"@/bring/server": path.resolve(__dirname, "src/editor/bring/server"),
	"@": path.resolve(__dirname, "./src/"),
	"next/image": path.resolve(__dirname, "src/editor/components/next-image.tsx"),
	"next/link": path.resolve(__dirname, "src/editor/components/next-link.tsx"),
}

editorConfig.plugins = [
	...editorConfig.plugins,
	new webpack.ProvidePlugin({
		process: path.resolve(__dirname, "process-mock.js"),
	}),
]

module.exports = editorConfig

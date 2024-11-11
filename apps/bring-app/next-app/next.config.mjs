import {withSentryConfig} from "@sentry/nextjs";

await import("./src/env.mjs");

const sentryProject = "template";

// Have a really good reason to touch the part below

/** @type {import("next").NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			// Placeholders
			{
				protocol: "https",
				hostname: "assets.weforum.org",
				port: "",
				pathname: "/article/image/**",
			},
			{
				protocol: "https",
				hostname: "picsum.photos",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "wp-template.bringblocks.com",
				port: "",
				pathname: "/**",
			},
			// WP
			{
				protocol: "https",
				hostname: "bringtemplatev2.gbdev",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "http",
				hostname: "localhost",
				port: "8080",
				pathname: "/**",
			},
		],
	},
};

const sentryWebpackPluginOptions = {
	hideSourceMaps: true,
	disableServerWebpackPlugin: true,
	disableClientWebpackPlugin: true,

	org: "bring-team",
	project: sentryProject,

	silent: true,
	automaticVercelMonitors: true,
};

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);

import { withSentryConfig } from "@sentry/nextjs"

const { env } = await import("./src/env.mjs")

const sentryProject = "template"

// Have a really good reason to touch the part below

/**
 * next/image only optimizes hosts listed in remotePatterns, so the WP media host
 * is derived from NEXT_PUBLIC_WP_BASE_URL. Falls back to the local dev WP when
 * the env var is absent (e.g. SKIP_ENV_VALIDATION docker builds).
 */
function wpRemotePattern() {
	try {
		const wpUrl = new URL(env.NEXT_PUBLIC_WP_BASE_URL ?? "")
		return {
			protocol: wpUrl.protocol.replace(":", ""),
			hostname: wpUrl.hostname,
			port: wpUrl.port,
			pathname: "/**",
		}
	} catch {
		return {
			protocol: "http",
			hostname: "localhost",
			port: "8080",
			pathname: "/**",
		}
	}
}

/** @type {import("next").NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			// Placeholder image hosts are development-only: in production they would
			// let anyone use the site's image optimizer as a free proxy for them.
			...(process.env.NODE_ENV === "development"
				? [
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
					]
				: []),
			// WP
			wpRemotePattern(),
		],
	},
}

const sentryWebpackPluginOptions = {
	hideSourceMaps: true,
	disableServerWebpackPlugin: true,
	disableClientWebpackPlugin: true,

	org: "bring-team",
	project: sentryProject,

	silent: true,
	automaticVercelMonitors: true,
}

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions)

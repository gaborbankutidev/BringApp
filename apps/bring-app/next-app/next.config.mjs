import { withSentryConfig } from "@sentry/nextjs"

const { env } = await import("./src/env.mjs")

// Generated apps override these so sourcemaps don't upload to Bring's own org
const sentryOrg = process.env.SENTRY_ORG ?? "bring-team"
const sentryProject = process.env.SENTRY_PROJECT ?? "template"

// Have a really good reason to touch the part below

/** @typedef {NonNullable<NonNullable<import("next").NextConfig["images"]>["remotePatterns"]>[number]} RemotePattern */

/**
 * Placeholder image hosts are development-only: in production they would let
 * anyone use the site's image optimizer as a free proxy for them.
 *
 * @type {RemotePattern[]}
 */
const placeholderPatterns = [
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

/**
 * next/image only optimizes hosts listed in remotePatterns, so the WP media host
 * is derived from NEXT_PUBLIC_WP_BASE_URL. Falls back to the local dev WP when
 * the env var is absent (e.g. SKIP_ENV_VALIDATION docker builds).
 *
 * @returns {RemotePattern}
 */
function wpRemotePattern() {
	try {
		const wpUrl = new URL(env.NEXT_PUBLIC_WP_BASE_URL ?? "")
		return {
			protocol: wpUrl.protocol === "https:" ? "https" : "http",
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

function wpOrigin() {
	try {
		return new URL(env.NEXT_PUBLIC_WP_BASE_URL ?? "").origin
	} catch {
		return ""
	}
}

/** @type {import("next").NextConfig} */
const nextConfig = {
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{ key: "X-Content-Type-Options", value: "nosniff" },
					{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
					// The WP origin stays allowed so wp-admin can iframe the app (e.g. preview)
					{
						key: "Content-Security-Policy",
						value: `frame-ancestors 'self' ${wpOrigin()}`.trim(),
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains",
					},
				],
			},
		]
	},
	images: {
		remotePatterns: [
			...(process.env.NODE_ENV === "development" ? placeholderPatterns : []),
			// WP
			wpRemotePattern(),
		],
	},
}

const sentryWebpackPluginOptions = {
	hideSourceMaps: true,
	disableServerWebpackPlugin: true,
	disableClientWebpackPlugin: true,

	org: sentryOrg,
	project: sentryProject,

	silent: true,
	automaticVercelMonitors: true,
}

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions)

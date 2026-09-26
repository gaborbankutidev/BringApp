import { env } from "@/env.mjs"

/*
 * NEXT_PUBLIC_BASE_URL is required by env validation at runtime, but
 * SKIP_ENV_VALIDATION builds (CI) prerender this route without it — fall
 * back to a relative sitemap URL instead of crashing the build.
 */
const baseUrl = (env.NEXT_PUBLIC_BASE_URL ?? "").replace(/\/$/, "")

const generateRobotsTxt = () =>
	`User-Agent: *
Allow: /
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`

export function GET() {
	const response = new Response(generateRobotsTxt(), {
		status: 200,
		statusText: "ok",
	})

	response.headers.append("content-type", "text/plain")

	return response
}

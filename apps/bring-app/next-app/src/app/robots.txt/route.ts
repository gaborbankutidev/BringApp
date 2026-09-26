import { env } from "@/env.mjs"

const generateRobotsTxt = () =>
	`User-Agent: *
Allow: /
Disallow: /api/

Sitemap: ${env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, "")}/sitemap.xml
`

export function GET() {
	const response = new Response(generateRobotsTxt(), {
		status: 200,
		statusText: "ok",
	})

	response.headers.append("content-type", "text/plain")

	return response
}

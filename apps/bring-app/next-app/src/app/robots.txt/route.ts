const generateRobotsTxt = (request: Request) =>
	`User-Agent: *
Allow: /
Disallow: /api/

Sitemap: http://${new URL(request.url).host}/sitemap/sitemap_index.xml 
`; // TODO: add NEXT_PUBLIC_BASE_URL to env.mjs and use it here

export function GET(request: Request) {
	const response = new Response(generateRobotsTxt(request), {
		status: 200,
		statusText: "ok",
	});

	response.headers.append("content-type", "text/plain");

	return response;
}

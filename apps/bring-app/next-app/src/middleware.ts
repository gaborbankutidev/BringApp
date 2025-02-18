import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(request: NextRequest) {
	const requestHeaders = new Headers(request.headers)
	const slug = request.nextUrl.pathname.substring(1)
	requestHeaders.set("x-slug", slug)

	return NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	})
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		{
			source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
			missing: [
				{ type: "header", key: "next-router-prefetch" },
				{ type: "header", key: "purpose", value: "prefetch" },
			],
		},

		{
			source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
			has: [
				{ type: "header", key: "next-router-prefetch" },
				{ type: "header", key: "purpose", value: "prefetch" },
			],
		},

		{
			source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
			has: [{ type: "header", key: "x-present" }],
			missing: [{ type: "header", key: "x-missing", value: "prefetch" }],
		},
	],
}

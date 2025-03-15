import { env } from "@/env.mjs"
import { RankMathHead } from "@bring/blocks-client/rank-math"
import { headers } from "next/headers"

export async function Head() {
	const header = await headers()
	const slug = header.get("x-slug") ?? ""
	const wpURL = env.NEXT_PUBLIC_WP_BASE_URL
	const nextURL = env.NEXT_PUBLIC_BASE_URL

	return (
		<head>
			<RankMathHead wpURL={wpURL} nextURL={nextURL} slug={slug} />
		</head>
	)
}

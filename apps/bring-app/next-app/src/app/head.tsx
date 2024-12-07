import { env } from "@/env.mjs"
import { getRankMathHead } from "@/utils/rank-math"
import parse from "html-react-parser"

type HeadProps = {
	slug?: string
}

export async function Head({ slug = "" }: HeadProps) {
	let html = ""

	// Add RankMath head
	html += await getRankMathHead(slug)

	// Add Cookiebot head
	if (env.NODE_ENV === "production") {
		html += `` // Add Cookiebot code here
	}

	// Add Google Tag Manager head
	if (env.NODE_ENV === "production") {
		html += `` // Add Google Tag Manager code here
	}

	return <head>{parse(html)}</head>
}

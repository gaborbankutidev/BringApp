import parse, {
	attributesToProps,
	Element,
	Text,
	type HTMLReactParserOptions,
} from "html-react-parser"
import React from "react"

import { getRankMathHead } from "./utils"

// The RankMath head blob comes from another service and may be influenced by
// WP users editing SEO meta — only metadata tags are allowed to render.
const ALLOWED_TAGS = new Set(["meta", "title", "link"])

const sanitizeAttribs = (attribs: Record<string, string>) => {
	const safe: Record<string, string> = {}

	for (const [key, value] of Object.entries(attribs)) {
		// on* handlers and http-equiv (meta refresh) never belong in SEO head output
		if (/^on/i.test(key) || key.toLowerCase() === "http-equiv") {
			continue
		}
		safe[key] = value
	}

	return safe
}

const textContent = (node: Element) =>
	node.children
		.filter((child): child is Text => child instanceof Text)
		.map((child) => child.data)
		.join("")

const sanitizeOptions: HTMLReactParserOptions = {
	replace: (domNode, index) => {
		if (!(domNode instanceof Element)) {
			return <></> // drop stray text/comments
		}

		const tag = domNode.name.toLowerCase()

		if (ALLOWED_TAGS.has(tag)) {
			const props = { ...attributesToProps(sanitizeAttribs(domNode.attribs)), key: index }

			return tag === "title" ? (
				<title {...props}>{textContent(domNode)}</title>
			) : (
				React.createElement(tag, props)
			)
		}

		// JSON-LD is kept, but re-serialized so it can only ever be JSON
		if (tag === "script" && domNode.attribs.type?.toLowerCase() === "application/ld+json") {
			try {
				const json = JSON.stringify(JSON.parse(textContent(domNode))).replace(/</g, "\\u003c")

				return (
					<script
						key={index}
						type="application/ld+json"
						dangerouslySetInnerHTML={{ __html: json }}
					/>
				)
			} catch {
				return <></>
			}
		}

		return <></>
	},
}

export const RankMathHead = async ({
	wpURL,
	nextURL,
	slug = "",
}: {
	wpURL: string
	nextURL: string
	slug?: string
}) => {
	try {
		const rankMathHead = await getRankMathHead(wpURL, nextURL, slug)
		return <>{parse(rankMathHead, sanitizeOptions)}</>
	} catch (error) {
		console.error("Failed to fetch RankMath head content:", error)
		return null
	}
}

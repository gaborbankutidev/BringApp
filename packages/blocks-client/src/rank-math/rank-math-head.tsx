import parse from "html-react-parser"
import React from "react"
import { getRankMathHead } from "./utils"

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
		return <>{parse(rankMathHead)}</>
	} catch (error) {
		console.error("Failed to fetch RankMath head content:", error)
		return null
	}
}

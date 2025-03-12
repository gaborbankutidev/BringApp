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
	const rankMathHead = await getRankMathHead(wpURL, nextURL, slug)

	return <>{parse(rankMathHead)}</>
}

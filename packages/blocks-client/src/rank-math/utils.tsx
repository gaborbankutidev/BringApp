type ResponseDataType = {
	success: boolean
	head: string
}

export const getRankMathHead = async (wpURL: string, nextURL: string, slug = "") => {
	const requestUrl = `${wpURL}/wp-json/rankmath/v1/getHead?url=${nextURL}/${slug}`

	try {
		const response = await fetch(requestUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})

		const responseData = (await response.json()) as ResponseDataType

		if (responseData.success) {
			return responseData.head.replace(/\n/g, "")
		}
	} catch (error) {
		console.error(error)
	}

	return ""
}

const getTitle = (raw: string) => {
	const startString = `meta property=\"og:title\" content=\"`
	const endString = `\" />`

	const startCut = raw.substring(raw.indexOf(startString) + startString.length)
	return startCut.substring(0, startCut.indexOf(endString))
}

export const getRankMathTitle = async (wpURL: string, nextURL: string, slug = "") => {
	const head = await getRankMathHead(wpURL, nextURL, slug)

	return getTitle(head)
}

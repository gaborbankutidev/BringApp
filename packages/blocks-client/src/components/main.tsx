import React from "react"
import { createBringElement, getEntity, getSiteProps } from "../content"
import { FCC } from "../types"

function makeMain<EP = object, SP = object, M = object, MI = object, CTX = object>(
	wpURL: string,
	dataToken: string,
	onRedirect: (redirectTo: string, responseCode: number) => void,
	onNotFound: () => void,
	componentMap: Map<string, FCC<unknown, EP, SP, M, MI, CTX>>
) {
	const Main = async ({ slug = "", context }: { slug?: string | string[]; context?: CTX }) => {
		const siteProps = await getSiteProps<SP, M, MI>(wpURL)
		const entity = await getEntity<EP>(wpURL, dataToken, onRedirect, onNotFound, slug)

		if (!entity) {
			return null
		}

		return (
			<>
				{entity.content.main
					? createBringElement(entity.content.main, componentMap, entity.props, siteProps, context)
					: null}
			</>
		)
	}

	return Main
}

export default makeMain

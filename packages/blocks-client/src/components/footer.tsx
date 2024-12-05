
import React from "react";
import {createBringElement, getEntity, getSiteProps} from "../content";
import type {BlockList} from "../types";

function makeFooter<EP = object, SP = object, M = object, MI = object, CTX = object>(
	wpURL: string,
	onRedirect: (redirectTo: string, responseCode: number) => void,
	onNotFound: () => void,
	blockList: BlockList<EP, SP, M, MI, CTX>,
) {
	const Footer = async ({slug = "", context}: {slug?: string | string[]; context?: CTX}) => {
		const siteProps = await getSiteProps<SP, M, MI>(wpURL);
		const entity = await getEntity<EP>(wpURL, onRedirect, onNotFound, slug);

		if (!entity || !siteProps) {
			return null;
		}

		return entity.content.footer ? (
			<footer>
				{createBringElement<EP, SP, M, MI, CTX>(
					entity.content.footer,
					blockList,
					entity.props,
					siteProps,
					context ?? ({} as CTX),
				)}
			</footer>
		) : null
	}

	return Footer
}

export default makeFooter

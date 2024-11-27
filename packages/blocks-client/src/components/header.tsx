import React from "react";
import {createBringElement, getEntity, getSiteProps} from "../content";
import type {BlockList} from "../types";

function makeHeader<EP = {}, SP = {}, M = {}, MI = {}, CTX = {}>(
	wpURL: string,
	onRedirect: (redirectTo: string, responseCode: number) => void,
	onNotFound: () => void,
	blockList: BlockList<EP, SP, M, MI, CTX>,
) {
	const Header = async ({slug = "", context}: {slug?: string | string[]; context?: CTX}) => {
		const siteProps = await getSiteProps<SP, M, MI>(wpURL);
		const entity = await getEntity<EP>(wpURL, onRedirect, onNotFound, slug);

		if (!entity || !siteProps) {
			return null;
		}

		return entity.content.header ? (
			<header>
				{createBringElement<EP, SP, M, MI, CTX>(
					entity.content.header,
					blockList,
					entity.props,
					siteProps,
					context ?? ({} as CTX),
				)}
			</header>
		) : null;
	};

	return Header;
}

export default makeHeader;

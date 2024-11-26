import React from "react";
import {createBringElement, getEntity, getSiteProps} from "../content";
import type {FCB} from "../types";

function makeFooter<EP = {}, SP = {}, M = {}, MI = {}, CTX = {}>(
	wpURL: string,
	onRedirect: (redirectTo: string, responseCode: number) => void,
	onNotFound: () => void,
	blockMap: Map<string, FCB<any, EP, SP, M, MI, CTX>>,
) {
	const Footer = async ({slug = "", context}: {slug?: string | string[]; context?: CTX}) => {
		const siteProps = await getSiteProps<SP, M, MI>(wpURL);
		const entity = await getEntity<EP>(wpURL, onRedirect, onNotFound, slug);

		if (!entity) {
			return null;
		}

		return entity.content.footer ? (
			<footer>
				{createBringElement(
					entity.content.footer,
					blockMap,
					entity.props,
					siteProps,
					context,
				)}
			</footer>
		) : null;
	};

	return Footer;
}

export default makeFooter;

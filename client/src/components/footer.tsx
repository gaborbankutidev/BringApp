import React from "react";
import type {FCC} from "../types";
import {getEntity, getSiteProps, createBringElement} from "../content";

function makeFooter<EP = {}, SP = {}, M = {}, MI = {}, CTX = {}>(
	wpURL: string,
	componentMap: Map<string, FCC<any, EP, SP, M, MI, CTX>>,
) {
	const Footer = async ({
		slug = "",
		context,
	}: {
		slug?: string | string[];
		context?: CTX;
	}) => {
		const siteProps = await getSiteProps<SP, M, MI>(wpURL);
		const entity = await getEntity<EP>(wpURL, slug);

		return entity?.content.footer ? (
			<footer>
				{createBringElement(
					entity.content.footer,
					componentMap,
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

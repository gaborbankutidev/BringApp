import React from "react";
import type {FCC} from "../types";
import {getEntity, getSiteProps, createBringElement} from "../content";

function makeHeader<EP = {}, SP = {}, M = {}, MI = {}, CTX = {}>(
	wpURL: string,
	componentMap: Map<string, FCC<any, EP, SP, M, MI, CTX>>,
) {
	const Header = async ({
		slug = "",
		context,
	}: {
		slug?: string | string[];
		context?: CTX;
	}) => {
		const siteProps = await getSiteProps<SP, M, MI>(wpURL);
		const entity = await getEntity<EP>(wpURL, slug);

		if (!entity) {
			return null;
		}

		return entity.content.header ? (
			<header>
				{createBringElement(
					entity.content.header,
					componentMap,
					entity.props,
					siteProps,
					context,
				)}
			</header>
		) : null;
	};

	return Header;
}

export default makeHeader;

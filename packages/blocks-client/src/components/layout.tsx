import React, {type ReactNode} from "react";
import {createBringElement, getEntity, getSiteProps} from "../content";
import type {FCB} from "../types";

function makeLayout<EP = {}, SP = {}, M = {}, MI = {}, CTX = {}>(
	wpURL: string,
	onRedirect: (redirectTo: string, responseCode: number) => void,
	onNotFound: () => void,
	blockMap: Map<string, FCB<any, EP, SP, M, MI, CTX>>,
) {
	const Layout = async ({
		slug = "",
		context,
		children,
	}: {
		slug?: string | string[];
		context?: CTX;
		children?: ReactNode;
	}) => {
		const siteProps = await getSiteProps<SP, M, MI>(wpURL);
		const entity = await getEntity<EP>(wpURL, onRedirect, onNotFound, slug);

		if (!entity) {
			return null;
		}

		return (
			<main>
				{entity.content.layout
					? createBringElement(
							entity.content.layout,
							blockMap,
							entity.props,
							siteProps,
							context,
							children,
						)
					: children}
			</main>
		);
	};

	return Layout;
}

export default makeLayout;

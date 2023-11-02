import React, {type ReactNode} from "react";
import type {FCC} from "../types";
import {getEntity, getSiteProps, createBringElement} from "../content";

function makeLayout<EP = {}, SP = {}, M = {}, MI = {}, CTX = {}>(
	wpURL: string,
	componentMap: Map<string, FCC<any, EP, SP, M, MI, CTX>>,
) {
	const Layout = async ({
		slug = "",
		context,
		children,
	}: {
		slug?: string | string[];
		context?: CTX;
		children: ReactNode;
	}) => {
		const siteProps = await getSiteProps<SP, M, MI>(wpURL);
		const entity = await getEntity<EP>(wpURL, slug);

		return (
			<main>
				{entity?.content.layout
					? createBringElement(
							entity.content.layout,
							componentMap,
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

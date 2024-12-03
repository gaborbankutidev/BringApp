import React, {type ReactNode} from "react";
import {createBringElement, getEntity, getSiteProps} from "../content";
import type {BlockList} from "../types";

function makeLayout<EP = object, SP = object, M = object, MI = object, CTX = object>(
	wpURL: string,
	onRedirect: (redirectTo: string, responseCode: number) => void,
	onNotFound: () => void,
	blockList: BlockList<EP, SP, M, MI, CTX>,
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

		if (!entity || !siteProps) {
			return null;
		}

		return (
			<main>
				{entity.content.layout
					? createBringElement<EP, SP, M, MI, CTX>(
							entity.content.layout,
							blockList,
							entity.props,
							siteProps,
							context ?? ({} as CTX),
							children,
						)
					: children}
			</main>
		);
	};

	return Layout;
}

export default makeLayout;

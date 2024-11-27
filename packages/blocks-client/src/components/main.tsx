import React from "react";
import {createBringElement, getEntity, getSiteProps} from "../content";
import {BlockList} from "../types";

function makeMain<EP = object, SP = object, M = object, MI = object, CTX = object>(
	wpURL: string,
	onRedirect: (redirectTo: string, responseCode: number) => void,
	onNotFound: () => void,
	blockList: BlockList<EP, SP, M, MI, CTX>,
) {
	const Main = async ({slug = "", context}: {slug?: string | string[]; context?: CTX}) => {
		const siteProps = await getSiteProps<SP, M, MI>(wpURL);
		const entity = await getEntity<EP>(wpURL, onRedirect, onNotFound, slug);

		if (!entity || !siteProps) {
			return null;
		}

		return (
			<>
				{entity.content.main
					? createBringElement<EP, SP, M, MI, CTX>(
							entity.content.main,
							blockList,
							entity.props,
							siteProps,
							context ?? ({} as CTX),
						)
					: null}
			</>
		);
	};

	return Main;
}

export default makeMain;

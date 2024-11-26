import React from "react";
import {createBringElement, getEntity, getSiteProps} from "../content";
import {FCB} from "../types";

function makeMain<EP = object, SP = object, M = object, MI = object, CTX = object>(
	wpURL: string,
	onRedirect: (redirectTo: string, responseCode: number) => void,
	onNotFound: () => void,
	blockMap: Map<string, FCB<unknown, EP, SP, M, MI, CTX>>,
) {
	const Main = async ({slug = "", context}: {slug?: string | string[]; context?: CTX}) => {
		const siteProps = await getSiteProps<SP, M, MI>(wpURL);
		const entity = await getEntity<EP>(wpURL, onRedirect, onNotFound, slug);

		if (!entity) {
			return null;
		}

		return (
			<>
				{entity.content.main
					? createBringElement(
							entity.content.main,
							blockMap,
							entity.props,
							siteProps,
							context,
						)
					: null}
			</>
		);
	};

	return Main;
}

export default makeMain;

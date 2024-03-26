import React from "react";
import {createBringElement, getEntity, getSiteProps} from "../content";
import {FCC} from "../types";

function makeMain<EP = {}, SP = {}, M = {}, MI = {}, CTX = {}>(
	wpURL: string,
	dataToken: string,
	componentMap: Map<string, FCC<any, EP, SP, M, MI, CTX>>,
) {
	const Main = async ({
		slug = "",
		context,
	}: {
		slug?: string | string[];
		context?: CTX;
	}) => {
		const siteProps = await getSiteProps<SP, M, MI>(wpURL);
		const entity = await getEntity<EP>(wpURL, dataToken, slug);

		if (!entity) {
			return null;
		}

		return (
			<>
				{entity.content.main
					? createBringElement(
							entity.content.main,
							componentMap,
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

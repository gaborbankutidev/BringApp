import type {ReactNode} from "react";
import {makeFooter, makeHeader, makeLayout, makeMain} from "./components";
import {createBringElement, getEntity} from "./content";
import type {BringNode, EntityProps, FCC, SiteProps} from "./types";

export function initRender<
	EP = {}, // EntityProps
	SP = {}, // SiteProps
	M = {}, // Menu
	MI = {}, // MenuItem
	CTX = {}, // Context
>(
	wpURL: string,
	dataToken: string,
	onRedirect: (redirectTo: string, responseCode: number) => void,
	onNotFound: () => void,
	componentList: {
		componentName: string;
		Component: FCC<any, EP, SP, M, MI, CTX>;
	}[],
) {
	// Create component map
	const componentMap = new Map<string, any>();
	componentList.forEach(({Component, componentName}) =>
		componentMap.set(componentName, Component),
	);

	return {
		createBringElement: (
			nodes: BringNode[],
			entityProps: EntityProps<EP>,
			siteProps: SiteProps<SP, M, MI>,
			context: CTX = {} as CTX,
			PostContent: ReactNode = null,
		) =>
			createBringElement(
				nodes,
				componentMap,
				entityProps,
				siteProps,
				context,
				PostContent,
			),
		getEntity: (slug: string | string[] = "") =>
			getEntity<EP>(wpURL, dataToken, onRedirect, onNotFound, slug),
		Header: makeHeader<EP, SP, M, MI, CTX>(
			wpURL,
			dataToken,
			onRedirect,
			onNotFound,
			componentMap,
		),
		Footer: makeFooter<EP, SP, M, MI, CTX>(
			wpURL,
			dataToken,
			onRedirect,
			onNotFound,
			componentMap,
		),
		Main: makeMain<EP, SP, M, MI, CTX>(
			wpURL,
			dataToken,
			onRedirect,
			onNotFound,
			componentMap,
		),
		Layout: makeLayout<EP, SP, M, MI, CTX>(
			wpURL,
			dataToken,
			onRedirect,
			onNotFound,
			componentMap,
		),
	};
}

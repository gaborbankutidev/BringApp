import type {ReactNode} from "react";
import {
	getDynamicEntityProps,
	getDynamicEntityList,
	getSiteProps,
	getEntity,
	createBringElement,
} from "./content";
import type {
	BringNode,
	EntityProps,
	EntityType,
	FCC,
	Obj,
	SiteProps,
} from "./types";
import {makeFooter, makeHeader, makeLayout, makeMain} from "./components";

function init<
	EP = {}, // EntityProps
	SP = {}, // SiteProps
	M = {}, // Menu
	MI = {}, // MenuItem
	CTX = {}, // Context
>(
	wpURL: string,
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
		// Dynamics
		getDynamicEntityProps: <T = {},>(
			entityId: number,
			entityType: EntityType,
			customData: any = {},
		) => getDynamicEntityProps<T>(wpURL, entityId, entityType, customData),
		getDynamicEntityList: <T = {},>(
			entitySlug: string,
			entityType: EntityType,
			limit: number = 0,
			customData = {},
		) =>
			getDynamicEntityList<T>(wpURL, entitySlug, entityType, limit, customData),
		// Content
		getSiteProps: () => getSiteProps<SP, M, MI>(wpURL),
		getEntity: (slug: string | string[] = "") => getEntity<EP>(wpURL, slug),
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
		// Components
		Header: makeHeader<EP, SP, M, MI, CTX>(wpURL, componentMap),
		Footer: makeFooter<EP, SP, M, MI, CTX>(wpURL, componentMap),
		Main: makeMain<EP, SP, M, MI, CTX>(wpURL, componentMap),
		Layout: makeLayout<EP, SP, M, MI, CTX>(wpURL, componentMap),
	};
}

export default init;

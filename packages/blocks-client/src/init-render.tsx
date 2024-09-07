import type {ReactNode} from "react";
import makeFooter from "./components/footer";
import makeHeader from "./components/header";
import makeLayout from "./components/layout";
import makeMain from "./components/main";

import {createBringElement, getEntity} from "./content";
import type {BringNode, ComponentList, EntityProps, SiteProps} from "./types";

/**
 * Initializes the rendering of BringBlocks components.
 *
 * @template EP - EntityProps
 * @template SP - SiteProps
 * @template M - Menu
 * @template MI - MenuItem
 * @template CTX - Context
 * @param wpURL - The WordPress URL.
 * @param dataToken - The data token.
 * @param onRedirect - Callback function for redirecting.
 * @param onNotFound - Callback function for handling not found pages.
 * @param componentList - List of components.
 * @returns Object containing various functions and components for rendering BringBlocks.
 */
export function initRender<
	EP = object, // EntityProps
	SP = object, // SiteProps
	M = object, // Menu
	MI = object, // MenuItem
	CTX = object, // Context
>(
	wpURL: string = "",
	dataToken: string,
	onRedirect: (redirectTo: string, responseCode: number) => void,
	onNotFound: () => void,
	componentList: ComponentList<EP, SP, M, MI>,
) {
	// Create component map
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const componentMap = new Map<string, any>();
	componentList.forEach(({Component, componentName}) =>
		componentMap.set(componentName, Component),
	);

	return {
		/**
		 * Creates a BringElement component.
		 *
		 * @param nodes - The nodes to render.
		 * @param entityProps - The entity props.
		 * @param siteProps - The site props.
		 * @param context - The context.
		 * @param PostContent - The post content.
		 * @returns The rendered component.
		 */
		createBringElement: (
			nodes: BringNode[],
			entityProps: EntityProps<EP>,
			siteProps: SiteProps<SP, M, MI>,
			context: CTX = {} as CTX,
			PostContent: ReactNode = null,
		) => createBringElement(nodes, componentMap, entityProps, siteProps, context, PostContent),

		/**
		 * Retrieves an entity from the WordPress API.
		 *
		 * @param slug - The entity slug.
		 * @returns The entity data.
		 */
		getEntity: (slug: string | string[] = "") =>
			getEntity<EP>(wpURL, dataToken, onRedirect, onNotFound, slug),

		/**
		 * The Header component.
		 * @param props - The properties of the Header component.
		 * @returns The rendered Header component.
		 */
		Header: makeHeader<EP, SP, M, MI, CTX>(
			wpURL,
			dataToken,
			onRedirect,
			onNotFound,
			componentMap,
		),

		/**
		 * The Footer component.
		 * @param props - The properties of the Footer component.
		 * @returns The rendered Footer component.
		 */
		Footer: makeFooter<EP, SP, M, MI, CTX>(
			wpURL,
			dataToken,
			onRedirect,
			onNotFound,
			componentMap,
		),

		/**
		 * The Main component.
		 * @param props - The properties of the Main component.
		 * @returns The rendered Main component.
		 */
		Main: makeMain<EP, SP, M, MI, CTX>(wpURL, dataToken, onRedirect, onNotFound, componentMap),

		/**
		 * The Layout component.
		 * @param props - The properties of the Layout component.
		 * @returns The rendered Layout component.
		 */
		Layout: makeLayout<EP, SP, M, MI, CTX>(
			wpURL,
			dataToken,
			onRedirect,
			onNotFound,
			componentMap,
		),
	};
}

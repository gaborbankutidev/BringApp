import type {ReactNode} from "react";
import {makeFooter, makeHeader, makeLayout, makeMain} from "./components";
import {createBringElement, getEntity} from "./content";
import type {BringNode, EntityProps, FCC, SiteProps} from "./types";

/**
 * Initializes the rendering of BringBlocks components.
 *
 * @template EP - EntityProps
 * @template SP - SiteProps
 * @template M - Menu
 * @template MI - MenuItem
 * @template CTX - Context
 * @param {string} wpURL - The WordPress URL.
 * @param {string} dataToken - The data token.
 * @param {(redirectTo: string, responseCode: number) => void} onRedirect - Callback function for redirecting.
 * @param {() => void} onNotFound - Callback function for handling not found pages.
 * @param {Array<{componentName: string; Component: FCC<any, EP, SP, M, MI, CTX>}>} componentList - List of components.
 * @returns {{
 *   createBringElement: (
 *     nodes: BringNode[],
 *     entityProps: EntityProps<EP>,
 *     siteProps: SiteProps<SP, M, MI>,
 *     context: CTX,
 *     PostContent: ReactNode
 *   ) => any;
 *   getEntity: (slug: string | string[]) => Promise<EP>;
 *   Header: any;
 *   Footer: any;
 *   Main: any;
 *   Layout: any;
 * }} - Object containing various functions and components for rendering BringBlocks.
 */
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
		/**
		 * Creates a BringElement component.
		 *
		 * @param {BringNode[]} nodes - The nodes to render.
		 * @param {EntityProps<EP>} entityProps - The entity props.
		 * @param {SiteProps<SP, M, MI>} siteProps - The site props.
		 * @param {CTX} context - The context.
		 * @param {ReactNode} PostContent - The post content.
		 * @returns {any} - The rendered component.
		 */
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

		/**
		 * Retrieves an entity from the WordPress API.
		 *
		 * @param {string | string[]} slug - The entity slug.
		 * @returns {Promise<EP>} - The entity data.
		 */
		getEntity: (slug: string | string[] = "") =>
			getEntity<EP>(wpURL, dataToken, onRedirect, onNotFound, slug),

		/**
		 * The Header component.
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
		 */
		Main: makeMain<EP, SP, M, MI, CTX>(
			wpURL,
			dataToken,
			onRedirect,
			onNotFound,
			componentMap,
		),

		/**
		 * The Layout component.
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

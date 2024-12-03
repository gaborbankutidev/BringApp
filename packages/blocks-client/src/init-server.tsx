import {makeDynamicEntity, makeDynamicEntityList} from "./components";
import {
	getDynamicEntityList,
	getDynamicEntityProps,
	getSiteProps,
	type GetDynamicEntityListOptions,
	type GetDynamicEntityPropsOptions,
} from "./content";
import type {EntityType} from "./types";

/**
 *  Initializes Bring Blocks functions that should be run on the server.
 *
 * @template SP - SiteProps
 * @template M - Menu
 * @template MI - MenuItem
 * @param wpURL - The WordPress URL.
 * @returns An object containing functions to retrieve dynamic entity props, dynamic entity list, and site props.
 */
export function initServer<
	SP = object, // SiteProps
	M = object, // Menu
	MI = object, // MenuItem
>(wpURL: string = "") {
	return {
		/**
		 * Retrieves the properties of a dynamic entity.
		 *
		 * @template T - The type of the entity props.
		 * @param entityId - The ID of the entity.
		 * @param entityType - The type of the entity.
		 * @param options - The options for retrieving the entity props.
		 * @returns A promise that resolves to the entity props.
		 */
		getDynamicEntityProps: <T = object, P = object>(
			entityId: number,
			entityType: EntityType,
			options: GetDynamicEntityPropsOptions = {},
		) => getDynamicEntityProps<T, P>(wpURL, entityId, entityType, options),

		/**
		 * Retrieves a list of dynamic entities.
		 *
		 * @template T - The type of the entity list.
		 * @param entitySlug - The slug of the entity.
		 * @param entityType - The type of the entity.
		 * @param options - The options for retrieving the entity list.
		 * @returns A promise that resolves to the entity list.
		 */
		getDynamicEntityList: <T = object, P = object>(
			entitySlug: string,
			entityType: EntityType,
			options: GetDynamicEntityListOptions = {},
		) => getDynamicEntityList<T, P>(wpURL, entitySlug, entityType, options),

		/**
		 * Retrieves the properties of the site.
		 *
		 * @returns A promise that resolves to the site props.
		 */
		getSiteProps: () => getSiteProps<SP, M, MI>(wpURL),

		/**
		 * Renders the dynamic entity on the server with the given render function.
		 * @template T - Additional properties type
		 * @template P - Additional parameters type
		 * @param props - The properties of the dynamic entity client.
		 * @returns The rendered dynamic entity.
		 */
		DynamicEntity: makeDynamicEntity(wpURL),
		/**
		 * Renders the dynamic entity list on the server with the given render function.
		 * @template T - Additional properties type
		 * @template P - Additional parameters type
		 * @param props - The properties of the dynamic entity list client.
		 * @returns The rendered dynamic entity list.
		 */
		DynamicEntityList: makeDynamicEntityList(wpURL),
	};
}

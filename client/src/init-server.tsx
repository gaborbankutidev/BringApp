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
 * @param {string} wpURL - The WordPress URL.
 * @returns {Object} - An object containing functions to retrieve dynamic entity props, dynamic entity list, and site props.
 */
export function initServer<
	SP = {}, // SiteProps
	M = {}, // Menu
	MI = {}, // MenuItem
>(wpURL: string) {
	return {
		/**
		 * Retrieves the properties of a dynamic entity.
		 *
		 * @template T - The type of the entity props.
		 * @param {number} entityId - The ID of the entity.
		 * @param {EntityType} entityType - The type of the entity.
		 * @param {GetDynamicEntityPropsOptions} options - The options for retrieving the entity props.
		 * @returns {Promise<T>} - A promise that resolves to the entity props.
		 */
		getDynamicEntityProps: <T = {}, P = {}>(
			entityId: number,
			entityType: EntityType,
			options: GetDynamicEntityPropsOptions = {},
		) => getDynamicEntityProps<T, P>(wpURL, entityId, entityType, options),

		/**
		 * Retrieves a list of dynamic entities.
		 *
		 * @template T - The type of the entity list.
		 * @param {string} entitySlug - The slug of the entity.
		 * @param {EntityType} entityType - The type of the entity.
		 * @param {GetDynamicEntityListOptions} options - The options for retrieving the entity list.
		 * @returns {Promise<T>} - A promise that resolves to the entity list.
		 */
		getDynamicEntityList: <T = {}, P = {}>(
			entitySlug: string,
			entityType: EntityType,
			options: GetDynamicEntityListOptions = {},
		) => getDynamicEntityList<T, P>(wpURL, entitySlug, entityType, options),

		/**
		 * Retrieves the properties of the site.
		 *
		 * @returns {Promise<SP>} - A promise that resolves to the site props.
		 */
		getSiteProps: () => getSiteProps<SP, M, MI>(wpURL),

		DynamicEntity: makeDynamicEntity(wpURL),
		DynamicEntityList: makeDynamicEntityList(wpURL),
	};
}

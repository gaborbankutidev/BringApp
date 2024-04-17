import {
	getDynamicEntityList,
	getDynamicEntityProps,
	getSiteProps,
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
		 * @param {any} customData - Custom data to be passed to the API.
		 * @returns {Promise<T>} - A promise that resolves to the entity props.
		 */
		getDynamicEntityProps: <T = {},>(
			entityId: number,
			entityType: EntityType,
			customData: any = {},
		) => getDynamicEntityProps<T>(wpURL, entityId, entityType, customData),

		/**
		 * Retrieves a list of dynamic entities.
		 *
		 * @template T - The type of the entity list.
		 * @param {string} entitySlug - The slug of the entity.
		 * @param {EntityType} entityType - The type of the entity.
		 * @param {number} limit - The maximum number of entities to retrieve. Defaults to 0 (no limit).
		 * @param {any} customData - Custom data to be passed to the API.
		 * @returns {Promise<T>} - A promise that resolves to the entity list.
		 */
		getDynamicEntityList: <T = {},>(
			entitySlug: string,
			entityType: EntityType,
			limit: number = 0,
			customData = {},
		) =>
			getDynamicEntityList<T>(wpURL, entitySlug, entityType, limit, customData),

		/**
		 * Retrieves the properties of the site.
		 *
		 * @returns {Promise<SP>} - A promise that resolves to the site props.
		 */
		getSiteProps: () => getSiteProps<SP, M, MI>(wpURL),
	};
}

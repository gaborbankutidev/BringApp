"use client";

import {
	useSiteProps,
	useDynamicEntityList,
	useDynamicEntityProps,
	type DynamicEntityListOptions,
	type DynamicEntityPropsOptions,
} from "./hooks";
import {makeUseWPSendForm} from "./hooks/use-wp-send-form";
import type {EntityType} from "./types";

/**
 * Initializes the client with the specified WordPress URL.
 * @template SP - SiteProps
 * @template M - Menu
 * @template MI - MenuItem
 * @param {string} wpURL - The WordPress URL.
 * @returns {object} The initialized client object.
 */
export function initClient<
	SP = {}, // SiteProps
	M = {}, // Menu
	MI = {}, // MenuItem
>(wpURL: string) {
	const client = {
		/**
		 * Retrieves the site props.
		 * @returns {object} The site props.
		 */
		useSiteProps: () => useSiteProps<SP, M, MI>(wpURL),

		/**
		 * Retrieves the dynamic entity props.
		 * @template T - The type of the entity props.
		 * @param {number} entityId - The ID of the entity.
		 * @param {EntityType} entityType - The type of the entity.
		 * @param {DynamicEntityPropsOptions} options - The options for retrieving the entity props.
		 * @returns {object} The dynamic entity props.
		 */
		useDynamicEntityProps: <T = {},>(
			entityId: number,
			entityType: EntityType,
			options: DynamicEntityPropsOptions = {},
		) => useDynamicEntityProps<T>(wpURL, entityId, entityType, options),

		/**
		 * Retrieves the dynamic entity list.
		 * @template T - The type of the entity list.
		 * @param {string} entitySlug - The slug of the entity.
		 * @param {EntityType} entityType - The type of the entity.
		 * @param {DynamicEntityListOptions} options - The options for retrieving the entity list.
		 * @returns {object} The dynamic entity list.
		 */
		useDynamicEntityList: <T = {},>(
			entitySlug: string,
			entityType: EntityType,
			options: DynamicEntityListOptions = {},
		) => useDynamicEntityList<T>(wpURL, entitySlug, entityType, options),

		/**
		 * Retrieves the WP send form hook.
		 * @returns {object} The WP send form hook.
		 */
		useWPSendForm: makeUseWPSendForm(wpURL),
	};

	return client;
}

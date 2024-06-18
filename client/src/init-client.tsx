"use client";

import {
	makeDynamicEntityClient,
	makeDynamicEntityListClient,
} from "./components";
import {
	useDynamicEntityList,
	useDynamicEntityProps,
	useSiteProps,
	type UseDynamicEntityListOptions,
	type UseDynamicEntityPropsOptions,
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
			options: UseDynamicEntityPropsOptions = {},
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
			options: UseDynamicEntityListOptions = {},
		) => useDynamicEntityList<T>(wpURL, entitySlug, entityType, options),

		/**
		 * Renders the dynamic entity on the client with the given render function.
		 * @template T - Additional properties type
		 * @template P - Additional parameters type
		 * @param props - The properties of the dynamic entity client.
		 * @returns The rendered dynamic entity.
		 */
		DynamicEntity: makeDynamicEntityClient(wpURL),

		/**
		 * Renders the dynamic entity list on the client with the given render function.
		 * @template T - Additional properties type
		 * @template P - Additional parameters type
		 * @param props - The properties of the dynamic entity list client.
		 * @returns The rendered dynamic entity list.
		 */
		DynamicEntityList: makeDynamicEntityListClient(wpURL),
		/**
		 * Retrieves the WP send form hook.
		 * @returns {object} The WP send form hook.
		 */
		useWPSendForm: makeUseWPSendForm(wpURL),
	};

	return client;
}

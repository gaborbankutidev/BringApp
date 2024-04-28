import {DynamicEntity, DynamicEntityList} from "./components";
import {
	getDynamicEntityList,
	getDynamicEntityProps,
	getSiteProps,
	type GetDynamicEntityListOptions,
	type GetDynamicEntityPropsOptions,
} from "./content";
import type {EntityType} from "./types";

export function initServer<
	SP = {}, // SiteProps
	M = {}, // Menu
	MI = {}, // MenuItem
>(wpURL: string) {
	return {
		getSiteProps: () => getSiteProps<SP, M, MI>(wpURL),

		getDynamicEntityProps: <T = {}, P = {}>(
			entityId: number,
			entityType: EntityType,
			options: GetDynamicEntityPropsOptions = {},
		) => getDynamicEntityProps<T, P>(wpURL, entityId, entityType, options),
		getDynamicEntityList: <T = {}, P = {}>(
			entitySlug: string,
			entityType: EntityType,
			options: GetDynamicEntityListOptions = {},
		) => getDynamicEntityList<T, P>(wpURL, entitySlug, entityType, options),

		DynamicEntity: <T = {}, P = {}>(
			entityId: number,
			entityType: EntityType,
			options: GetDynamicEntityPropsOptions = {},
		) => DynamicEntity<T, P>({wpURL, entityId, entityType, options}),
		DynamicEntityList: <T = {}, P = {}>(
			entitySlug: string,
			entityType: EntityType,
			options: GetDynamicEntityListOptions = {},
		) => DynamicEntityList<T, P>({wpURL, entitySlug, entityType, options}),
	};
}

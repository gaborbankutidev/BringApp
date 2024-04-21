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
		getDynamicEntityProps: <T = {},>(
			entityId: number,
			entityType: EntityType,
			options: GetDynamicEntityPropsOptions = {},
		) => getDynamicEntityProps<T>(wpURL, entityId, entityType, options),
		getDynamicEntityList: <T = {},>(
			entitySlug: string,
			entityType: EntityType,
			options: GetDynamicEntityListOptions = {},
		) => getDynamicEntityList<T>(wpURL, entitySlug, entityType, options),
		getSiteProps: () => getSiteProps<SP, M, MI>(wpURL),
	};
}

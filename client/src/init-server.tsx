import {
	getDynamicEntityList,
	getDynamicEntityProps,
	getSiteProps,
} from "./content";
import type {EntityType} from "./types";

export function initServer<
	EP = {}, // EntityProps
	SP = {}, // SiteProps
	M = {}, // Menu
	MI = {}, // MenuItem
>(wpURL: string) {
	return {
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
		getSiteProps: () => getSiteProps<SP, M, MI>(wpURL),
	};
}

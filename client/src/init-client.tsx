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

export function initClient<
	SP = {}, // SiteProps
	M = {}, // Menu
	MI = {}, // MenuItem
>(wpURL: string) {
	return {
		useSiteProps: () => useSiteProps<SP, M, MI>(wpURL),
		useDynamicEntityProps: <T = {},>(
			entityId: number,
			entityType: EntityType,
			options: DynamicEntityPropsOptions = {},
		) => useDynamicEntityProps<T>(wpURL, entityId, entityType, options),
		useDynamicEntityList: <T = {},>(
			entitySlug: string,
			entityType: EntityType,
			options: DynamicEntityListOptions = {},
		) => useDynamicEntityList<T>(wpURL, entitySlug, entityType, options),
		useWPSendForm: makeUseWPSendForm(wpURL),
	};
}

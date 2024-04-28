"use client";

import {DynamicEntityClient, DynamicEntityListClient} from "./components";
import {
	useDynamicEntityList,
	useDynamicEntityProps,
	useSiteProps,
	type UseDynamicEntityListOptions,
	type UseDynamicEntityPropsOptions,
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
			options: UseDynamicEntityPropsOptions = {},
		) => useDynamicEntityProps<T>(wpURL, entityId, entityType, options),
		useDynamicEntityList: <T = {},>(
			entitySlug: string,
			entityType: EntityType,
			options: UseDynamicEntityListOptions = {},
		) => useDynamicEntityList<T>(wpURL, entitySlug, entityType, options),

		DynamicEntity: <T = {}, P = {}>(
			entityId: number,
			entityType: EntityType,
			options: UseDynamicEntityPropsOptions = {},
		) => DynamicEntityClient<T, P>({wpURL, entityId, entityType, options}),
		DynamicEntityList: <T = {}, P = {}>(
			entitySlug: string,
			entityType: EntityType,
			options: UseDynamicEntityListOptions = {},
		) =>
			DynamicEntityListClient<T, P>({wpURL, entitySlug, entityType, options}),

		useWPSendForm: makeUseWPSendForm(wpURL),
	};
}

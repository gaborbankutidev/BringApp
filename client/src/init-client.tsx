"use client";

import {type ReactNode} from "react";
import {
	DynamicEntityClient,
	DynamicEntityListClient,
	type DynamicEntityListClientRenderProps,
	type DynamicEntityPropsClientRenderProps,
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
			Render?: (props: DynamicEntityPropsClientRenderProps<T, P>) => ReactNode,
		) =>
			DynamicEntityClient<T, P>({wpURL, entityId, entityType, options, Render}),
		DynamicEntityList: <T = {}, P = {}>(
			entitySlug: string,
			entityType: EntityType,
			options: UseDynamicEntityListOptions = {},
			Render?: (props: DynamicEntityListClientRenderProps<T, P>) => ReactNode,
		) =>
			DynamicEntityListClient<T, P>({
				wpURL,
				entitySlug,
				entityType,
				options,
				Render,
			}),

		useWPSendForm: makeUseWPSendForm(wpURL),
	};
}

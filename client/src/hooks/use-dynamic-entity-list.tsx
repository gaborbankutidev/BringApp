"use client";

import {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import {getDynamicEntityList} from "../content";
import type {DynamicEntityList, EntityType} from "../types";

export type Options = {
	limit?: number;
	lazy?: boolean;
	customData?: {[key: string]: any};
	customDataKey?: boolean | number | string;
};

/**
 * Custom hook for fetching and managing a dynamic entity list.
 *
 * @template T - The type of the entity list items.
 * @param {string} wpURL - The URL of the WordPress site.
 * @param {string | null | undefined} entitySlug - The slug of the entity.
 * @param {EntityType | null | undefined} entityType - The type of the entity.
 * @param {Options} options - Additional options for the hook.
 * @returns {Object} - An object containing the entity list and a ref for the intersection observer.
 */
export function useDynamicEntityList<T = {}>(
	wpURL: string,
	entitySlug: string | null | undefined,
	entityType: EntityType | null | undefined,
	{limit = 0, lazy = true, customData = {}, customDataKey}: Options = {},
) {
	const [entityList, setEntityList] = useState<DynamicEntityList<T>>(null);

	// intersection observer for lazy loading
	const {ref, inView: wasOnScreen} = useInView({
		triggerOnce: true,
		skip: !lazy,
	});

	// query entity list
	useEffect(() => {
		// set null if entitySlug or entityType are null
		if (!entitySlug || !entityType) {
			setEntityList(null);
			return;
		}

		// do not query if lazy but was not on screen
		if (lazy && !wasOnScreen) {
			return;
		}

		// query entity list & set cache & state
		getDynamicEntityList<T>(
			wpURL,
			entitySlug,
			entityType,
			limit,
			customData,
		).then((queriedEntityList) => {
			if (!queriedEntityList) {
				return;
			}
			setEntityList(queriedEntityList);
		});
	}, [entitySlug, entityType, limit, customDataKey, lazy, wasOnScreen]);

	return {entityList, ref};
}

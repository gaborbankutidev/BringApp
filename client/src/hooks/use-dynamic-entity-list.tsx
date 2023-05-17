import {useState, useEffect, useMemo, useCallback} from "react";
import {useBringContext} from "../context";
import type {DynamicEntityList, EntityType} from "../types";
import {useInView} from "react-intersection-observer";

type Options = {
	limit?: number;
	lazy?: boolean;
	customData?: {[key: string]: any};
	customDataKey?: boolean | number | string;
};

async function getEntityList(
	entitySlug: string,
	entityType: EntityType,
	limit: number = 0,
	customData = {},
) {
	try {
		const response = await fetch("/wp-json/bring/dynamic/list", {
			method: "POST",
			body: JSON.stringify({entitySlug, entityType, limit, customData}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const responseData = await response.json();
		return responseData.data;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export const useDynamicEntityList = <T extends {[key: string]: any} = {}>(
	entitySlug: string | null | undefined,
	entityType: EntityType | null | undefined,
	{limit = 0, lazy = true, customData = {}, customDataKey}: Options = {},
) => {
	const {dynamicCache} = useBringContext();

	// set cached value as initial state
	const [entityList, setEntityList] = useState<DynamicEntityList<T>>(() => {
		if (!entitySlug || !entityType) {
			return null;
		}

		const cacheKey = customDataKey
			? `list_${entityType}_${entitySlug}_${limit}_${customDataKey}`
			: `list_${entityType}_${entitySlug}_${limit}`;

		return dynamicCache.get(cacheKey) ?? null;
	});

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

		// get cached list
		const cacheKey = customDataKey
			? `list_${entityType}_${entitySlug}_${limit}_${customDataKey}`
			: `list_${entityType}_${entitySlug}_${limit}`;
		const cachedList = dynamicCache.get(cacheKey) ?? null;

		// set and return if it was already cached
		if (cachedList) {
			setEntityList(cachedList);
			return;
		}

		// do not query if lazy but was not on screen
		if (lazy && !wasOnScreen) {
			return;
		}

		// query entity list & set cache & state
		getEntityList(entitySlug, entityType, limit, customData).then(
			(queriedEntityList) => {
				if (!queriedEntityList) {
					return;
				}
				setEntityList(queriedEntityList);
				dynamicCache.set(cacheKey, queriedEntityList);
			},
		);
	}, [
		entitySlug,
		entityType,
		limit,
		customDataKey,
		lazy,
		wasOnScreen,
		dynamicCache,
	]);

	return {entityList, ref};
};

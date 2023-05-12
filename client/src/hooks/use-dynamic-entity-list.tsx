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
	// get value from cache
	const {dynamicCache} = useBringContext();
	const {cacheKey, cachedList} = useMemo(() => {
		if (!entitySlug || !entityType) {
			return {cacheKey: null, cachedList: null};
		}

		const cacheKey = customDataKey
			? `list_${entityType}_${entitySlug}_${limit}_${customDataKey}`
			: `list_${entityType}_${entitySlug}_${limit}`;
		const cachedList = dynamicCache.get(cacheKey) ?? null;

		return {cacheKey, cachedList};
	}, [entitySlug, entityType, limit, customDataKey, dynamicCache]);

	// set cached value as initial state
	const [entityList, setEntityList] =
		useState<DynamicEntityList<T>>(cachedList);

	// intersection observer for lazy loading
	const {ref, inView: wasOnScreen} = useInView({
		triggerOnce: true,
		skip: !lazy,
	});

	// update entity list on change of input params
	useEffect(() => {
		setEntityList(cachedList);
	}, [cachedList]);

	// query entity props
	useEffect(() => {
		// do not query if entity list is set
		if (entityList) {
			return;
		}

		// do not query if entity slug & type => cacheKey are not set
		if (!entitySlug || !entityType || !cacheKey) {
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
		cacheKey,
		lazy,
		wasOnScreen,
		dynamicCache,
	]);

	return {entityList, ref};
};

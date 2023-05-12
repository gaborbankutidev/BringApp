import {useState, useEffect, useMemo, useCallback} from "react";
import {useInView} from "react-intersection-observer";
import type {DynamicEntityProps, EntityType} from "../types";
import {useBringContext} from "../context";

type Options = {
	lazy?: boolean;
	customData?: {[key: string]: any};
	customDataKey?: boolean | number | string;
};

async function getEntityProps(
	entityId: number,
	entityType: EntityType,
	customData = {},
) {
	try {
		const response = await fetch("/wp-json/bring/dynamic/props", {
			method: "POST",
			body: JSON.stringify({entityId, entityType, customData}),
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

export const useDynamicEntityProps = <T extends {[key: string]: any} = {}>(
	entityId: number | null | undefined,
	entityType: EntityType | null | undefined,
	{lazy = true, customData = {}, customDataKey}: Options = {},
) => {
	// get value from cache
	const {dynamicCache} = useBringContext();
	const {cacheKey, cachedProps} = useMemo(() => {
		if (!entityId || !entityType) {
			return {cacheKey: null, cachedProps: null};
		}

		const cacheKey = customDataKey
			? `prop_${entityType}_${entityId}_${customDataKey}`
			: `prop_${entityType}_${entityId}`;
		const cachedProps = dynamicCache.get(cacheKey) ?? null;

		return {cacheKey, cachedProps};
	}, [entityId, entityType, customDataKey, dynamicCache]);

	// set cached value as initial state
	const [entityProps, setEntityProps] =
		useState<DynamicEntityProps<T>>(cachedProps);

	// intersection observer for lazy loading
	const {ref, inView: wasOnScreen} = useInView({
		triggerOnce: true,
		skip: !lazy,
	});

	// update entity props on change of input params
	useEffect(() => {
		setEntityProps(cachedProps);
	}, [cachedProps]);

	// query entity props
	useEffect(() => {
		// do not query if entity props are set
		if (entityProps) {
			return;
		}

		// do not query if entity type & id => cacheKey are not set
		if (!entityId || !entityType || !cacheKey) {
			return;
		}

		// do not query if lazy but was not on screen
		if (lazy && !wasOnScreen) {
			return;
		}

		// query entity props & set cache & state
		getEntityProps(entityId, entityType, customData).then(
			(queriedEntityProps) => {
				if (!queriedEntityProps) {
					return;
				}
				setEntityProps(queriedEntityProps);
				dynamicCache.set(cacheKey, queriedEntityProps);
			},
		);
	}, [entityId, entityType, cacheKey, lazy, wasOnScreen, dynamicCache]);

	return {entityProps, ref};
};

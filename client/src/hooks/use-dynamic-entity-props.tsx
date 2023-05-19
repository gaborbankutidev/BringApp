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
	const {dynamicCache} = useBringContext();

	// set cached value as initial state
	const [entityProps, setEntityProps] = useState<DynamicEntityProps<T>>(() => {
		if (!entityId || !entityType) {
			return null;
		}

		const cacheKey = customDataKey
			? `prop_${entityType}_${entityId}_${customDataKey}`
			: `prop_${entityType}_${entityId}`;

		return dynamicCache.get(cacheKey) ?? null;
	});

	// intersection observer for lazy loading
	const {ref, inView: wasOnScreen} = useInView({
		triggerOnce: true,
		skip: !lazy,
	});

	// query entity props
	useEffect(() => {
		// set null if entityId or entityType are null
		if (!entityId || !entityType) {
			setEntityProps(null);
			return;
		}

		// get cached props
		const cacheKey = customDataKey
			? `prop_${entityType}_${entityId}_${customDataKey}`
			: `prop_${entityType}_${entityId}`;
		const cachedProps = dynamicCache.get(cacheKey) ?? null;

		// set and return if it was already cached
		if (cachedProps) {
			setEntityProps(cachedProps);
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
	}, [entityId, entityType, customDataKey, lazy, wasOnScreen, dynamicCache]);

	return {entityProps, ref};
};

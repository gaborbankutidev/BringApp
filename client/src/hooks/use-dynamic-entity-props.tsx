import {useState, useEffect, useCallback} from "react";
import {useInView} from "react-intersection-observer";
import type {DynamicEntityProps, EntityType} from "../types";
import {useBringContext} from "../context/bring-context";

export const useDynamicEntityProps = <T extends {[key: string]: any} = {}>(
	entityId?: number,
	entityType: EntityType = "post",
	lazy: boolean = true,
	customData?: {[key: string]: any},
	customDataKey?: boolean | number | string,
) => {
	// store queried entity
	const [entityProps, setEntityProps] = useState<DynamicEntityProps<T>>(null);

	// intersection observer for lazy loading
	const {ref, inView: wasOnScreen} = useInView({
		triggerOnce: true,
		skip: !lazy,
	});

	// dynamic cache to find and store entityProps
	const {dynamicCache} = useBringContext();

	// flag if value is stored in cache but waiting to be resolved
	const [isWaiting, setWaiting] = useState(0);
	const waitForCache = useCallback(
		() => setTimeout(() => setWaiting(isWaiting + 1), 50),
		[setWaiting],
	);

	const getEntityProps = useCallback(async () => {
		const cacheKey = customDataKey
			? `${entityType}_${entityId}_${customDataKey}`
			: `${entityType}_${entityId}`;

		const cachedData = dynamicCache.get(cacheKey);
		if (cachedData === true) {
			waitForCache();
			return;
		} else if (cachedData) {
			setEntityProps(cachedData);
			return;
		}

		// store value to cache to show this is waiting to be resolved
		dynamicCache.set(cacheKey, true);

		// fetch data
		const request = await fetch("/wp-json/bring/dynamic/props", {
			method: "POST",
			body: JSON.stringify({entityId, entityType, customData}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await request.json();
		if (data.data === null) {
			return;
		}

		setEntityProps(data.data);
		dynamicCache.set(cacheKey, data.data);
	}, [entityType, entityId, customDataKey, dynamicCache, setEntityProps]);

	useEffect(() => {
		if (lazy && wasOnScreen && entityId) {
			getEntityProps();
		} else if (!lazy && entityId) {
			getEntityProps();
		}
	}, [entityId, entityType, lazy, wasOnScreen, isWaiting, customDataKey]);

	return {entity: entityProps, ref};
};

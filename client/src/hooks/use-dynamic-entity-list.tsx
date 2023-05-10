import {useState, useEffect, useCallback} from "react";
import {useBringContext} from "../context";
import type {DynamicEntityList, EntityType} from "../types";

type Options = {
	entitySlug?: string;
	limit?: number;
	customData?: {[key: string]: any};
	customDataKey?: boolean | number | string;
	disableCache?: boolean;
};

export const useDynamicEntityList = <T extends {[key: string]: any} = {}>(
	entityType: EntityType = "post",
	{entitySlug, limit = 0, customData, customDataKey}: Options = {},
) => {
	// store queried entity
	const [entityList, setEntityList] = useState<DynamicEntityList<T>>(null);

	// dynamic cache to find and store entityProps
	const {dynamicCache} = useBringContext();

	// flag if value is stored in cache but waiting to be resolved
	const [isWaiting, setWaiting] = useState(0);
	const waitForCache = useCallback(
		() => setTimeout(() => setWaiting(isWaiting + 1), 50),
		[setWaiting],
	);

	const getEntityList = useCallback(async () => {
		const cacheKey = customDataKey
			? `${entityType}_${entitySlug}_${limit}_${customDataKey}`
			: `${entityType}_${entitySlug}_${limit}`;

		const cachedData = dynamicCache.get(cacheKey);
		if (cachedData === true) {
			waitForCache();
			return;
		} else if (cachedData) {
			setEntityList(cachedData);
			return;
		}

		// store value to cache to show this is waiting to be resolved
		dynamicCache.set(cacheKey, true);

		const request = await fetch("/wp-json/bring/dynamic/list", {
			method: "POST",
			body: JSON.stringify({entitySlug, entityType, limit, customData}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = (await request.json()) as {data: DynamicEntityList<T>};
		if (data.data === null) {
			return;
		}

		setEntityList(data.data);
		dynamicCache.set(cacheKey, data.data);
	}, [entitySlug, entityType, customDataKey, dynamicCache, setEntityList]);

	useEffect(() => {
		getEntityList();
	}, [entitySlug, entityType, limit, customDataKey, isWaiting]);

	return entityList;
};

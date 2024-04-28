"use client";

import {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import {
	getDynamicEntityProps,
	type GetDynamicEntityPropsOptions,
	type GetDynamicEntityPropsParams,
} from "../content";
import type {DynamicEntityProps, EntityType} from "../types";

export type UseDynamicEntityPropsOptions = {
	lazy?: boolean;
	updateKey?: boolean | number | string;
} & GetDynamicEntityPropsOptions;

export function useDynamicEntityProps<T = {}, P = {}>(
	wpURL: string,
	entityId: number | null | undefined,
	entityType: EntityType | null | undefined,
	{
		lazy = true,
		customData = {},
		cache,
		updateKey,
	}: UseDynamicEntityPropsOptions = {},
) {
	const customDataKey = JSON.stringify(customData);
	const [queriedProps, setQueriedProps] = useState<{
		entityProps: DynamicEntityProps<T>;
		params: GetDynamicEntityPropsParams<P>;
	} | null>(null);

	// intersection observer for lazy loading
	const {ref, inView: wasOnScreen} = useInView({
		triggerOnce: true,
		skip: !lazy,
	});

	// query entity props
	useEffect(() => {
		// set null if entityId or entityType are null
		if (!entityId || !entityType) {
			setQueriedProps(null);
			return;
		}

		// do not query if lazy but was not on screen
		if (lazy && !wasOnScreen) {
			return;
		}

		// query entity props & set cache & state
		getDynamicEntityProps<T, P>(wpURL, entityId, entityType, {
			customData,
			cache,
		}).then((queried) => {
			if (!queried.entityProps) {
				return;
			}
			setQueriedProps(
				queried as {
					entityProps: DynamicEntityProps<T>;
					params: GetDynamicEntityPropsParams<P>;
				},
			);
		});
	}, [entityId, entityType, customDataKey, lazy, wasOnScreen, updateKey]);

	return queriedProps?.entityProps
		? {
				entityProps: queriedProps.entityProps,
				params: queriedProps.params,
				ref,
			}
		: {entityProps: null, params: {} as P, ref};
}

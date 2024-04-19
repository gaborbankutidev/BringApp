"use client";

import {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import {getDynamicEntityProps} from "../content";
import type {DynamicEntityProps, EntityType} from "../types";

export type Options = {
	lazy?: boolean;
	customData?: {[key: string]: any};
	customDataKey?: boolean | number | string;
};

/**
 * Custom hook for fetching dynamic entity props.
 *
 * @template T - The type of the entity props.
 * @param {string} wpURL - The WordPress URL.
 * @param {number | null | undefined} entityId - The ID of the entity.
 * @param {EntityType | null | undefined} entityType - The type of the entity.
 * @param {Options} options - Additional options for the hook.
 * @returns {{ entityProps: DynamicEntityProps<T> | null, ref: React.RefObject<any> }} - The entity props and a ref for lazy loading.
 */
export function useDynamicEntityProps<T = {}>(
	wpURL: string,
	entityId: number | null | undefined,
	entityType: EntityType | null | undefined,
	{lazy = true, customData = {}, customDataKey}: Options = {},
) {
	const [entityProps, setEntityProps] = useState<DynamicEntityProps<T>>(null);

	// Intersection observer for lazy loading
	const {ref, inView: wasOnScreen} = useInView({
		triggerOnce: true,
		skip: !lazy,
	});

	// Query entity props
	useEffect(() => {
		// Set null if entityId or entityType are null
		if (!entityId || !entityType) {
			setEntityProps(null);
			return;
		}

		// Do not query if lazy but was not on screen
		if (lazy && !wasOnScreen) {
			return;
		}

		// Query entity props & set cache & state
		getDynamicEntityProps<T>(wpURL, entityId, entityType, customData).then(
			(queriedEntityProps) => {
				if (!queriedEntityProps) {
					return;
				}
				setEntityProps(queriedEntityProps);
			},
		);
	}, [entityId, entityType, customDataKey, lazy, wasOnScreen]);

	return {entityProps, ref};
}

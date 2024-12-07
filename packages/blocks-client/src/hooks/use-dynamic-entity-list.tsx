"use client"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import {
	getDynamicEntityList,
	type GetDynamicEntityListOptions,
	type GetDynamicEntityListParams,
} from "../content"
import type { DynamicEntityList, EntityType } from "../types"

/**
 * Represents the options for fetching a dynamic entity list.
 * @template P - Additional properties type
 * @property lazy - Whether to lazy load the entity list.
 * @property updateKey - A key to update the entity list.
 */
export type UseDynamicEntityListOptions = {
	lazy?: boolean
	updateKey?: boolean | number | string
} & GetDynamicEntityListOptions

/**
 * Custom hook for fetching and managing a dynamic entity list.
 *
 * @template T - The type of the entity list items.
 * @param wpURL - The URL of the WordPress site.
 * @param entitySlug - The slug of the entity.
 * @param entityType - The type of the entity.
 * @param options - The options for fetching the entity list.
 * @returns - An object containing the entity list and a ref for the intersection observer.
 */
export function useDynamicEntityList<T = object, P = object>(
	wpURL: string,
	entitySlug: string | null | undefined,
	entityType: EntityType | null | undefined,
	{
		limit = 0,
		offset = 0,
		page = 1,
		lazy = true,
		customData = {},
		cache = "no-store",
		updateKey,
	}: UseDynamicEntityListOptions = {}
) {
	const customDataKey = JSON.stringify(customData)
	const [queriedList, setQueriedList] = useState<{
		entityList: DynamicEntityList<T>
		params: GetDynamicEntityListParams<P>
	} | null>(null)

	// intersection observer for lazy loading
	const { ref, inView: wasOnScreen } = useInView({
		triggerOnce: true,
		skip: !lazy,
	})

	// query entity list
	useEffect(() => {
		// set null if entitySlug or entityType are null
		if (!entitySlug || !entityType) {
			setQueriedList(null)
			return
		}

		// do not query if lazy but was not on screen
		if (lazy && !wasOnScreen) {
			return
		}

		// query entity list & set cache & state
		getDynamicEntityList<T, P>(wpURL, entitySlug, entityType, {
			limit,
			offset,
			page,
			customData,
			cache,
		}).then((queried) => {
			if (!queried.entityList) {
				return
			}
			setQueriedList(queried)
		})
	}, [entitySlug, entityType, limit, offset, customDataKey, lazy, wasOnScreen, updateKey])

	return queriedList
		? { entityList: queriedList.entityList, params: queriedList.params, ref }
		: {
				entityList: null,
				params: { count: 0 } as GetDynamicEntityListParams<P>,
				ref,
			}
}

import {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import {getDynamicEntityProps} from "../content";
import type {DynamicEntityProps, EntityType} from "../types";

export type Options = {
	lazy?: boolean;
	customData?: {[key: string]: any};
	customDataKey?: boolean | number | string;
};

export function useDynamicEntityProps<T = {}>(
	url: string,
	entityId: number | null | undefined,
	entityType: EntityType | null | undefined,
	{lazy = true, customData = {}, customDataKey}: Options = {},
) {
	const [entityProps, setEntityProps] = useState<DynamicEntityProps<T>>(null);

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

		// do not query if lazy but was not on screen
		if (lazy && !wasOnScreen) {
			return;
		}

		// query entity props & set cache & state
		getDynamicEntityProps<T>(url, entityId, entityType, customData).then(
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

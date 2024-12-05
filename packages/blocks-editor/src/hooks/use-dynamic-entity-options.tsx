
import {useEffect, useState} from "react";
import type {NumberSelectControlOptions} from "../controls/types";

type EntityType = "post" | "taxonomy" | "author";

type DynamicEntityOptions = [number, string][] | null;

type Options = {
	entitySlug?: string
	customData?: { [key: string]: any }
	customDataKey?: boolean | number | string
	withDefault?: boolean
}

async function getEntityOptions(entityType: EntityType, entitySlug: string = "", customData = {}) {
	try {
		const response = await fetch("/wp-json/bring/editor/options", {
			method: "POST",
			body: JSON.stringify({ entityType, entitySlug, customData }),
			headers: {
				"Content-Type": "application/json",
			},
		})

		const responseData = (await response.json()) as {
			data: DynamicEntityOptions
		}

		if (!responseData.data) {
			return null
		}

		return responseData.data.map((item) => ({
			value: item[0],
			label: item[1],
		}))
	} catch (error) {
		console.error(error)
		return null
	}
}

export const useDynamicEntityOptions = (
	entityType: EntityType = "post",
	{ entitySlug, customData, customDataKey, withDefault = true }: Options = {}
) => {
	const [entityOptions, setEntityOptions] = useState<NumberSelectControlOptions | null>(null)

	useEffect(() => {
		getEntityOptions(entityType, entitySlug, customData).then((queriedEntityOptions) => {
			if (!queriedEntityOptions) {
				setEntityOptions(null)
				return
			}

			setEntityOptions(
				withDefault ? [{ value: 0, label: "Unset" }, ...queriedEntityOptions] : queriedEntityOptions
			)
		})
	}, [entityType, entitySlug, customDataKey])

	return entityOptions
}

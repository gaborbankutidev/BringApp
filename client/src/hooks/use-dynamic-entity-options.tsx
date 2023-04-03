import {useState, useEffect} from "react";
import type {
	DynamicEntityOptions,
	EntityType,
	SelectControlOptions,
} from "../types";

export const useDynamicEntityOptions = (
	entitySlug: string,
	entityType: EntityType = "post",
	customData?: any,
) => {
	const [entityOptions, setEntityOptions] =
		useState<SelectControlOptions | null>(null);

	const getPostIds = async () => {
		const request = await fetch("/wp-json/bring/dynamic/options", {
			method: "POST",
			body: JSON.stringify({entitySlug, entityType, customData}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = (await request.json()) as {data: DynamicEntityOptions};
		if (data.data === null) {
			return;
		}

		const options = data.data.map((item) => ({
			value: item[0].toString(),
			label: item[1],
		}));
		options.push({value: "", label: "Default"});

		setEntityOptions(options);
	};

	useEffect(() => {
		getPostIds();
	}, [entitySlug, entityType]);

	return entityOptions;
};

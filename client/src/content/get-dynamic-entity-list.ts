import type {DynamicEntityList, EntityType} from "../types";

export type Options = {
	limit?: number;
	offset?: number;
	customData?: {[key: string]: any};
	cache?: "force-cache" | "no-store";
};

async function getDynamicEntityList<T = {}>(
	wpURL: string,
	entitySlug: string,
	entityType: EntityType,
	{limit = 0, offset = 0, customData = {}, cache = "force-cache"}: Options = {},
) {
	const params = new URLSearchParams({
		entitySlug,
		entityType,
		limit: limit.toString(),
		offset: offset.toString(),
		customData: JSON.stringify(customData),
	});

	try {
		const response = await fetch(
			`${wpURL}/wp-json/bring/dynamic/list?${params.toString()}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				cache,
			},
		);

		const responseData = await response.json();
		return responseData.data as DynamicEntityList<T>;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export default getDynamicEntityList;

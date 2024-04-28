import type {DynamicEntityList, EntityType} from "../types";

export type GetDynamicEntityListOptions = {
	limit?: number;
	offset?: number;
	page?: number;
	customData?: {[key: string]: any};
	cache?: "force-cache" | "no-store";
};

export type GetDynamicEntityListParams<P> = {count: number} & P;

async function getDynamicEntityList<T = {}, P = {}>(
	wpURL: string,
	entitySlug: string,
	entityType: EntityType,
	{
		limit = 0,
		offset = 0,
		page = 1,
		customData = {},
		cache = "force-cache",
	}: GetDynamicEntityListOptions = {},
) {
	const params = new URLSearchParams({
		entitySlug,
		entityType,
		limit: limit.toString(),
		offset: offset.toString(),
		page: page.toString(),
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

		const responseRaw = await response.json();
		const responseData = responseRaw.data as {
			entityList: DynamicEntityList<T>;
			params: GetDynamicEntityListParams<P>;
		} | null;

		return (
			responseData ?? {
				entityList: null,
				params: {count: 0} as GetDynamicEntityListParams<P>,
			}
		);
	} catch (error) {
		console.error(error);
		return {
			entityList: null,
			params: {count: 0} as GetDynamicEntityListParams<P>,
		};
	}
}

export default getDynamicEntityList;

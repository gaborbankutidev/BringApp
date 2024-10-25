import type {DynamicEntityList, EntityType} from "../types";

/**
 * Represents the options for retrieving a dynamic entity list.
 * @template P - Additional properties type
 * @property limit - The maximum number of entities to retrieve.
 * @property offset - The number of entities to skip.
 * @property page - The page number to retrieve.
 * @property customData - Custom data to include in the request.
 * @property cache - The cache mode for the request.
 */
export type GetDynamicEntityListOptions = {
	limit?: number;
	offset?: number;
	page?: number;
	customData?: {[key: string]: any};
	cache?: "force-cache" | "no-store";
};

/**
 * Represents the parameters for retrieving a dynamic entity list.
 * @template P - Additional properties type
 * @property count - The number of entities in the list.
 */
export type GetDynamicEntityListParams<P> = {count: number} & P;

/**
 * Retrieves a dynamic entity list from a WordPress site.
 *
 * @template T - The type of data contained in the dynamic entity list.
 * @param wpURL - The URL of the WordPress site.
 * @param entitySlug - The slug of the dynamic entity.
 * @param entityType - The type of the dynamic entity.
 * @param options - The options for retrieving the dynamic entity list.
 * @returns A promise that resolves to the dynamic entity list.
 */
async function getDynamicEntityList<T = {}, P = {}>(
	wpURL: string,
	entitySlug: string,
	entityType: EntityType,
	{
		limit = 0,
		offset = 0,
		page = 1,
		customData = {},
		cache = "no-store",
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
		const response = await fetch(`${wpURL}/wp-json/bring/dynamic/list?${params.toString()}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			cache,
		});

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

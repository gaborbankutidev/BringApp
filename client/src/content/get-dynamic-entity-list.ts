import type {DynamicEntityList, EntityType} from "../types";

/**
 * Retrieves a dynamic entity list from a WordPress site.
 *
 * @template T - The type of data contained in the dynamic entity list.
 * @param wpURL - The URL of the WordPress site.
 * @param entitySlug - The slug of the dynamic entity.
 * @param entityType - The type of the dynamic entity.
 * @param limit - The maximum number of entities to retrieve (default: 0).
 * @param customData - Additional custom data to include in the request (default: {}).
 * @returns A promise that resolves to the dynamic entity list.
 */
async function getDynamicEntityList<T = {}>(
	wpURL: string,
	entitySlug: string,
	entityType: EntityType,
	limit: number = 0,
	customData = {},
) {
	try {
		const response = await fetch(`${wpURL}/wp-json/bring/dynamic/list`, {
			method: "POST",
			body: JSON.stringify({entitySlug, entityType, limit, customData}),
			headers: {
				"Content-Type": "application/json",
			},
			// next: {revalidate: 60},
		});

		const responseData = await response.json();
		return responseData.data as DynamicEntityList<T>;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export default getDynamicEntityList;

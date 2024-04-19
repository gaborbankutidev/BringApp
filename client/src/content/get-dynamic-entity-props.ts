import type {DynamicEntityProps, EntityType} from "../types";

/**
 * Retrieves dynamic entity properties from a WordPress site.
 * @param wpURL - The URL of the WordPress site.
 * @param entityId - The ID of the entity.
 * @param entityType - The type of the entity.
 * @param customData - Custom data to be sent along with the request.
 * @returns A promise that resolves to the dynamic entity properties.
 */
async function getDynamicEntityProps<T = {}>(
	wpURL: string,
	entityId: number,
	entityType: EntityType,
	customData = {},
) {
	try {
		const response = await fetch(`${wpURL}/wp-json/bring/dynamic/props`, {
			method: "POST",
			body: JSON.stringify({entityId, entityType, customData}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const responseData = await response.json();
		return responseData.data as DynamicEntityProps<T>;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export default getDynamicEntityProps;

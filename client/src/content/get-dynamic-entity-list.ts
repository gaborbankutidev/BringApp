import type {DynamicEntityList, EntityType} from "../types";

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

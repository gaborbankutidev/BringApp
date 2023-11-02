import type {DynamicEntityProps, EntityType} from "../types";

async function getDynamicEntityProps<T = {}>(
	url: string,
	entityId: number,
	entityType: EntityType,
	customData = {},
) {
	try {
		const response = await fetch(`${url}/wp-json/bring/dynamic/props`, {
			method: "GET",
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

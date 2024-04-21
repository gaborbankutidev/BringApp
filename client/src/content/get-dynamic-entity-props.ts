import type {DynamicEntityProps, EntityType} from "../types";

export type Options = {
	customData?: {[key: string]: any};
	cache?: "force-cache" | "no-store";
};

async function getDynamicEntityProps<T = {}>(
	wpURL: string,
	entityId: number,
	entityType: EntityType,
	{customData = {}, cache = "force-cache"}: Options = {},
) {
	const params = new URLSearchParams({
		entityId: entityId.toString(),
		entityType,
		customData: JSON.stringify(customData),
	});

	try {
		const response = await fetch(
			`${wpURL}/wp-json/bring/dynamic/props?${params.toString()}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				cache,
			},
		);

		const responseData = await response.json();
		return responseData.data as DynamicEntityProps<T>;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export default getDynamicEntityProps;

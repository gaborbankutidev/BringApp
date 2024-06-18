import type {DynamicEntityProps, EntityType} from "../types";

/**
 * Represents the options for retrieving dynamic entity properties.
 * @template P - Additional properties type
 * @property customData - Custom data to include in the request.
 * @property cache - The cache mode for the request.
 */
export type GetDynamicEntityPropsOptions = {
	customData?: {[key: string]: any};
	cache?: "force-cache" | "no-store";
};

export type GetDynamicEntityPropsParams<P> = P;

/**
 * Retrieves dynamic entity properties from a WordPress site.
 * @param wpURL - The URL of the WordPress site.
 * @param entityId - The ID of the entity.
 * @param entityType - The type of the entity.
 * @param options - The options for retrieving the dynamic entity properties.
 * @returns A promise that resolves to the dynamic entity properties.
 */
async function getDynamicEntityProps<T = {}, P = {}>(
	wpURL: string,
	entityId: number,
	entityType: EntityType,
	{customData = {}, cache = "force-cache"}: GetDynamicEntityPropsOptions = {},
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

		const responseRaw = await response.json();
		const responseData = responseRaw.data as {
			entityProps: DynamicEntityProps<T>;
			params: GetDynamicEntityPropsParams<P>;
		} | null;

		return responseData ?? {entityProps: null, params: {} as P};
	} catch (error) {
		console.error(error);
		return {entityProps: null, params: {} as P};
	}
}

export default getDynamicEntityProps;

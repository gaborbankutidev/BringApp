import type {Entity} from "../types";

/**
 * Represents a successful response with an entity.
 * @template EP - The entity properties type.
 * @property responseCode - The response code.
 * @property entity - The entity.
 */
type SuccessResponse<EP> = {
	responseCode: 200;
	entity: Entity<EP>;
};

/**
 * Represents a redirect response.
 * @property responseCode - The response code.
 * @property redirectTo - The URL to redirect to.
 * @property entity - The entity.
 */
type RedirectResponse = {
	responseCode: 301 | 302 | 307 | 308;
	redirectTo: string;
	entity: null;
};

/**
 * Represents an error response.
 * @property responseCode - The response code.
 * @property entity - The entity.
 */
type ErrorResponse = {
	responseCode: 400;
	entity: null;
};

/**
 * Represents a not found response.
 * @property responseCode - The response code.
 */
type NotFoundResponse = {
	responseCode: 404;
};

/**
 * Represents the possible response types for the `getEntity` function.
 * @template EP - The entity properties type.
 */
type GetEntityResponseType<EP> =
	| SuccessResponse<EP>
	| RedirectResponse
	| ErrorResponse
	| NotFoundResponse;

/**
 * Fetches an entity from the specified URL.
 * @param wpURL - The WordPress URL.
 * @param dataToken - The data token.
 * @param onRedirect - Callback function to handle redirect responses.
 * @param onNotFound - Callback function to handle not found responses.
 * @param slug - The slug of the entity to fetch.
 * @returns The fetched entity or null if there was an error.
 */
async function getEntity<EP = {}>(
	wpURL: string,
	dataToken: string,
	onRedirect: (redirectTo: string, responseCode: number) => void,
	onNotFound: () => void,
	slug: string | string[] = "",
): Promise<Entity<EP> | null> {
	const joinedSlug = (typeof slug === "string" ? slug : slug.join("/")) + "/";

	// fetch entity
	let responseData = null;
	try {
		const response = await fetch(
			`${wpURL}/${joinedSlug}?data_token=${dataToken}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			},
		);

		responseData = (await response.json()) as GetEntityResponseType<EP>; // TODO: parse with zod
	} catch (error) {
		console.error(error);
		return null;
	}

	// handle redirect
	if (
		responseData.responseCode === 301 ||
		responseData.responseCode === 302 ||
		responseData.responseCode === 307 ||
		responseData.responseCode === 308
	) {
		onRedirect(responseData.redirectTo, responseData.responseCode);
		return null;
	}

	// handle not found
	if (responseData.responseCode === 404) {
		onNotFound();
		return null;
	}

	// handle error
	if (responseData.responseCode !== 200) {
		console.error(
			`Error while fetching entity at ${joinedSlug}, response code: ${responseData.responseCode}`,
		);
		return null;
	}

	// return entity
	return responseData.entity;
}

export default getEntity;

import type {Entity} from "../types";

type SuccessResponse<EP> = {
	responseCode: 200;
	entity: Entity<EP>;
};

type RedirectResponse = {
	responseCode: 301 | 302 | 307 | 308;
	redirectTo: string;
	entity: null;
};

type ErrorResponse = {
	responseCode: 400;
	entity: null;
};

type NotFoundResponse = {
	responseCode: 404;
};

type GetEntityResponseType<EP> =
	| SuccessResponse<EP>
	| RedirectResponse
	| ErrorResponse
	| NotFoundResponse;

async function getEntity<EP = {}>(
	wpURL: string,
	dataToken: string,
	slug: string | string[] = "",
) {
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
		console.log(
			`Redirecting from ${joinedSlug} to, ${responseData.redirectTo}`,
		);
		return null;
	}

	// handle not found
	if (responseData.responseCode === 404) {
		console.log(`Entity not found at ${joinedSlug}`);
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

import type {Entity} from "../types";

type NotFoundResponse = {
	responseCode: 404;
	slug: "not_found";
	type: "general";
};
type RedirectResponse = {
	responseCode: 301 | 302 | 307;
	redirectTo: string;
};

export type GetEntityReturnType<EP> =
	| Entity<EP>
	| NotFoundResponse
	| RedirectResponse;

async function getEntity<EP = {}>(url: string, slug: string | string[] = "") {
	const joinedSlug = typeof slug === "string" ? slug : slug.join("/");

	try {
		const response = await fetch(`${url}/${joinedSlug}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const responseData = (await response.json()) as GetEntityReturnType<EP>; // TODO: parse with zod
		return responseData;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export default getEntity;

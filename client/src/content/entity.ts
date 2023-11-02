import type {Entity} from "../types";

async function getEntity<EP = {}>(url: string, slug: string | string[] = "") {
	const joinedSlug = typeof slug === "string" ? slug : slug.join("/");

	try {
		const response = await fetch(`${url}/${joinedSlug}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const responseData = (await response.json()) as Entity<EP>;
		return responseData;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export default getEntity;

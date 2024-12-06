import {env} from "@/env.mjs";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type SitemapType = {
	url: string;
	lastModified: string;
}[];

export default async function sitemap() {
	const wpURL = env.NEXT_PUBLIC_WP_BASE_URL;
	const requestUrl = `${wpURL}/wp-json/bring/sitemap`;

	try {
		const response = await fetch(requestUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		return (await response.json()) as SitemapType;
	} catch (error) {
		console.error(error);
	}

	return [];
}

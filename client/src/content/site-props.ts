import type {SiteProps} from "../types";

async function getSiteProps<SP = {}, M = {}, MI = {}>(url: string) {
	try {
		const response = await fetch(`${url}/wp-json/bring/dynamic/site`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const responseData = await response.json();
		return responseData.data as SiteProps<SP, M, MI>;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export default getSiteProps;

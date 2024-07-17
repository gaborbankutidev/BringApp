import {env} from "@/env.mjs";

type ResponseDataType = {
	success: boolean;
	head: string;
};

export const getRankMathHead = async (slug = "") => {
	const wpURL = env.NEXT_PUBLIC_WP_BASE_URL;

	const requestUrl = `${wpURL}/wp-json/rankmath/v1/getHead?url=${wpURL}/${slug}`;

	try {
		const response = await fetch(requestUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const responseData = (await response.json()) as ResponseDataType;

		if (responseData.success) {
			const lineBreaksRemoved = responseData.head.replaceAll(`\n`, "");

			const newBaseUrl = "localhost:3000"; // TODO: add NEXT_BASE_URL to env.mjs and use it here
			const ogUrlReplace = lineBreaksRemoved.replace(
				/(<meta property=\"og:url\" content="https?:\/\/)[^\/"]+([^"]*)\/(")/,
				`$1${newBaseUrl}$2$3`,
			);
			return ogUrlReplace;
		}
	} catch (error) {
		console.error(error);
	}

	return "";
};

const getTitle = (raw: string) => {
	const startString = `meta property=\"og:title\" content=\"`;
	const endString = `\" />`;

	const startCut = raw.substring(raw.indexOf(startString) + startString.length);
	return startCut.substring(0, startCut.indexOf(endString));
};

export const getRankMathTitle = async (slug = "") => {
	const head = await getRankMathHead(slug);

	return getTitle(head);
};

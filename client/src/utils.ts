export const defaultImageValue = {id: null, src: "", alt: ""};

export const objectKeys = <Obj extends object>(obj?: Obj): (keyof Obj)[] => {
	return obj ? (Object.keys(obj) as (keyof Obj)[]) : [];
};

export function toAbsoluteUrl(base: string, relative: string) {
	const isAbsolute = /^[a-z][a-z\d+\-.]*:\/\//i.test(relative);

	if (isAbsolute) {
		return relative; // Return as is if it's already absolute
	}

	// Ensure the base URL ends with a slash
	if (!base.endsWith("/")) {
		base += "/";
	}

	// Ensure the relative URL doesn't start with a slash to avoid double slashes
	if (relative.startsWith("/")) {
		relative = relative.substr(1);
	}

	return base + relative;
}

export const updateRankMathHeader = async (_url: string) => {
	const url = toAbsoluteUrl(window.location.origin, _url);

	// query RankMath headless data
	let headHtmlString = null;
	try {
		// fetch data
		const response = await fetch(`/wp-json/rankmath/v1/getHead?url=${url}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.status !== 200) {
			throw `Failed. Response code: ${response.status}`;
		}

		const data = (await response.json()) as {
			success: boolean;
			head: string;
		};

		if (!data.success) {
			throw "Failed to get RankMath data";
		}

		headHtmlString = data.head;
	} catch (error) {
		console.error(error);
		return;
	}

	// Find the start and end nodes of RankMath meta tags
	const head = document.querySelector("head");
	if (!head) {
		return;
	}

	const nodes = Array.from(head.childNodes);

	let startNode: ChildNode | null = null;
	let endNode: ChildNode | null = null;

	const startComment =
		"Search Engine Optimization by Rank Math - https://rankmath.com/";
	const endComment = "/Rank Math WordPress SEO plugin";

	nodes.forEach((node) => {
		// Node type 8 is a comment node, return if it's not a comment
		if (node.nodeType !== 8) {
			return;
		}

		if (node.nodeValue?.trim() === startComment) {
			startNode = node;
		} else if (node.nodeValue?.trim() === endComment) {
			endNode = node;
		}
	});

	if (!startNode || !endNode) {
		console.error("startNode or endDone were not found");
		return;
	}

	// Remove old meta tags
	// @ts-ignore
	let node = startNode.nextSibling;
	while (node && node !== endNode) {
		let nextNode = node.nextSibling;
		node.remove();
		node = nextNode;
	}

	// Add new meta tags
	const template = document.createElement("template");
	template.innerHTML = headHtmlString.trim();

	const elements = Array.from(template.content.childNodes).filter(
		(node) => node.nodeType === 1, // Node type 1 is an element node
	);

	let currentNode = startNode;
	elements.forEach((element) => {
		if (currentNode.nextSibling) {
			head.insertBefore(element, currentNode.nextSibling);
			// @ts-ignore
			currentNode = element;
		} else {
			head.appendChild(element);
		}
	});

	// update title
	const title = document.head
		.querySelector('meta[property="og:title"]')
		?.getAttribute("content");

	if (title) {
		document.title = title;
	}
};

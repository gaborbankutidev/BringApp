/**
 * Represents the default image value.
 */
export const defaultImageValue = {
	id: null,
	src: "https://wp-template.bringblocks.com/wp-content/uploads/screenshot.jpg",
	alt: "Bring Theme Placeholder Image",
};

/**
 * Returns an array of keys from the given object.
 * @param obj - The object to extract keys from.
 * @returns An array of keys from the object.
 */
export const objectKeys = <Obj extends object>(obj?: Obj): (keyof Obj)[] => {
	return obj ? (Object.keys(obj) as (keyof Obj)[]) : [];
};

/**
 * Converts a relative URL to an absolute URL based on the base URL.
 * @param base - The base URL.
 * @param relative - The relative URL.
 * @returns The absolute URL.
 */
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

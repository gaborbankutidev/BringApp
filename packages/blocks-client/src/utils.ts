/**
 * Represents the default image value.
 * @property id - The image ID.
 * @property src - The image source URL.
 * @property alt - The image alt text.
 */
export const defaultImageValue = {
	id: null,
	src: "https://picsum.photos/1200/900",
	alt: "Bring Theme Placeholder Image",
}

/**
 * Returns an array of keys from the given object.
 * @param obj - The object to extract keys from.
 * @returns An array of keys from the object.
 */
export const objectKeys = <Obj extends object>(obj?: Obj): (keyof Obj)[] => {
	return obj ? (Object.keys(obj) as (keyof Obj)[]) : []
}

/**
 * Encodes a visitor-supplied slug for safe interpolation into a URL path.
 * Splits on "/", drops empty, "." and ".." segments (path traversal) and
 * percent-encodes each remaining segment (neutralizes "?", "#", "&", ...).
 * @param slug - The slug as a string or array of path segments.
 * @returns The encoded slug, segments joined with "/".
 */
export const encodeSlug = (slug: string | string[]): string => {
	const segments = typeof slug === "string" ? slug.split("/") : slug.flatMap((s) => s.split("/"))

	return segments
		.filter((segment) => segment !== "" && segment !== "." && segment !== "..")
		.map(encodeURIComponent)
		.join("/")
}

/**
 * Converts a relative URL to an absolute URL based on the base URL.
 * @param base - The base URL.
 * @param relative - The relative URL.
 * @returns The absolute URL.
 */
export function toAbsoluteUrl(base: string, relative: string) {
	const isAbsolute = /^[a-z][a-z\d+\-.]*:\/\//i.test(relative)

	if (isAbsolute) {
		return relative // Return as is if it's already absolute
	}

	// Ensure the base URL ends with a slash
	if (!base.endsWith("/")) {
		base += "/"
	}

	// Ensure the relative URL doesn't start with a slash to avoid double slashes
	if (relative.startsWith("/")) {
		relative = relative.substr(1)
	}

	return base + relative
}

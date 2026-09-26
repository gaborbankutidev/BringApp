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

/**
 * Allowlist-validates a URL for use in `href`/`src` attributes.
 * Relative URLs and the http, https, mailto and tel schemes pass through;
 * anything with another scheme (`javascript:`, `data:`, ...) returns the fallback.
 * Block URL attributes are editor-controlled, so render them through this.
 * @param url - The URL to validate.
 * @param fallback - Returned for empty or disallowed URLs (default "#").
 * @returns The original URL if safe, otherwise the fallback.
 */
export const sanitizeUrl = (url: string | null | undefined, fallback = "#"): string => {
	if (!url) {
		return fallback
	}

	const trimmed = url.trim()
	// browsers strip control chars/whitespace when parsing schemes ("java\tscript:")
	const detectable = trimmed.replace(/[\u0000- ]/g, "")
	const hasScheme = /^[a-z][a-z\d+\-.]*:/i.test(detectable)

	return !hasScheme || /^(https?|mailto|tel):/i.test(detectable) ? trimmed : fallback
}

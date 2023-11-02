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

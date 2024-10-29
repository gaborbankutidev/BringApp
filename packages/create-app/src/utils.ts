export const kebabCase = (str: string): string => {
	return (
		str
			// Split words at camelCase boundaries and separate words joined by non-alphanumeric characters
			.replace(/([a-z])([A-Z])/g, "$1 $2")
			.replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
			// Insert space before numbers unless preceded by another number or lowercase letter
			.replace(/([a-zA-Z])(\d)/g, "$1$2")
			.replace(/(\d)([a-zA-Z])/g, "$1 $2")
			// Remove any non-alphanumeric characters and replace them with a space
			.replace(/[^a-zA-Z0-9]+/g, " ")
			// Trim any spaces at the start or end, and collapse multiple spaces
			.trim()
			.replace(/\s+/g, "-")
			.toLowerCase()
	);
};

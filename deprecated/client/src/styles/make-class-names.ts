import type {ResponsiveValue} from "./types";

const screenSizes = ["", "md", "lg"] as const;

/**
 * Makes responsive class names.
 * @param className - The class name.
 * @param responsiveValue - The responsive value.
 * @param responsiveConfig - The responsive config.
 * @returns The responsive class names.
 */
export const makeResponsiveClassNames = <T = number>(
	className: string,
	responsiveValue: ResponsiveValue<T>,
	responsiveConfig: ResponsiveValue<T> = {},
) => {
	const classNames: string[] = [];

	const addClassName = (size: keyof ResponsiveValue<T>, value?: T) =>
		value !== undefined &&
		classNames.push(size ? `${size}:${className}-${value}` : `${className}-${value}`);

	screenSizes.map((size) => addClassName(size, responsiveValue[size] ?? responsiveConfig[size]));

	return classNames.join(" ");
};

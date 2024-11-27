import type {
	NumberOptionList,
	NumberSelectControlOptions,
	OptionList,
	SelectControlOptions,
} from "../types";
import {capitalize} from "../utils";
import type {ControlByPath, ControlType} from "./types";

/**
 * Checks if a control is a path control.
 * @param props - The control properties.
 * @returns True if the control is a path control, false otherwise.
 */
export function isPathControl<vT, pT extends object = object>(
	props: ControlType<vT, pT>,
): props is ControlByPath<pT, vT> {
	return props.updateHandling !== "by-value";
}

/**
 * Generates an option list for a SelectControl.
 * @param options - The options for the SelectControl.
 * @param withDefault - Whether to include a default option. Defaults to true.
 * @returns The generated SelectControlOptions.
 */
export function makeOptions<T extends string>(
	options: OptionList<T>,
	withDefault: boolean | string = true,
): SelectControlOptions<T> {
	const optionList = options.map((option) =>
		Array.isArray(option)
			? {label: option[1], value: option[0]}
			: {label: capitalize(option), value: option},
	);

	return withDefault
		? [
				{
					label: withDefault === true ? "Default" : withDefault,
					value: "",
				},
				...optionList,
			]
		: optionList;
}

/**
 * Generates an option list for a NumberSelectControl.
 * @param options - The options for the NumberSelectControl.
 * @param withDefault - Whether to include a default option. Defaults to true.
 * @returns The generated NumberSelectControlOptions.
 */
export function makeNumberOptions<T extends number>(
	options: NumberOptionList<T>,
	withDefault: boolean | string = true,
): NumberSelectControlOptions<T> {
	const optionList = options.map((option) =>
		Array.isArray(option)
			? {label: option[1], value: option[0]}
			: {label: capitalize(`${option}`), value: option},
	);

	return withDefault
		? [
				{
					label: withDefault === true ? "Default" : withDefault,
					value: 0,
				},
				...optionList,
			]
		: optionList;
}

/**
 * Converts options of a SelectControl to options of a NumberSelectControl.
 * @param selectOptions - The options of the SelectControl.
 * @returns The converted NumberSelectControlOptions.
 */
export const optionsToNumberOptions = <From extends string>(
	selectOptions: SelectControlOptions<From>,
): NumberSelectControlOptions<number> =>
	selectOptions.map(({label, value}) => ({
		label,
		value: parseInt(value),
	}));

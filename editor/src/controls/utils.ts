import type {
	Obj,
	OptionList,
	SelectControlOptions,
	NumberOptionList,
	NumberSelectControlOptions,
} from "../types";
import {capitalize} from "../utils";
import type {ControlByPath, ControlType} from "./types";

export function isPathControl<vT, pT extends Obj = {}>(
	props: ControlType<vT, pT>,
): props is ControlByPath<pT, vT> {
	return props.updateHandling !== "by-value";
}

// generates option list for SelectControl
export function makeOptions<T extends string>(
	options: OptionList<T>,
	withDefault = true,
): SelectControlOptions<T> {
	const optionList = options.map((option) =>
		Array.isArray(option)
			? {label: option[1], value: option[0]}
			: {label: capitalize(option), value: option},
	);

	return withDefault
		? [
				...optionList,
				{
					label: "Default",
					value: "",
				},
		  ]
		: optionList;
}

// generates option list for NumberControl
export function makeNumberOptions<T extends number>(
	options: NumberOptionList<T>,
	withDefault = true,
): NumberSelectControlOptions<T> {
	const optionList = options.map((option) =>
		Array.isArray(option)
			? {label: option[1], value: option[0]}
			: {label: capitalize(`${option}`), value: option},
	);

	return withDefault
		? [
				...optionList,
				{
					label: "Default",
					value: 0,
				},
		  ]
		: optionList;
}

export const optionsToNumberOptions = <From extends string>(
	selectOptions: SelectControlOptions<From>,
): NumberSelectControlOptions<number> =>
	selectOptions.map(({label, value}) => ({
		label,
		value: parseInt(value),
	}));

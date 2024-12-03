import {TextareaControl as WPTextareaControl} from "@wordpress/components";
import cloneDeep from "lodash.clonedeep";
import get from "lodash.get";
import set from "lodash.set";
import type {FC} from "react";
import React from "react";
import {useControlContext} from "../context";
import type {ControlByPath, ControlByValue, ControlType} from "../types";
import {isPathControl} from "../utils";

/**
 * Props for the TextareaControl component.
 */
type _TextareaControl = {rows?: number};

/**
 * A control component that renders a textarea input.
 *
 * @template pT - The type of the attributes object.
 *
 * @param props - The props for the TextareaControl component.
 * @returns The rendered TextareaControl component.
 */
export const TextareaControl = <pT extends object = object>(
	props: ControlType<string, pT> & _TextareaControl,
) =>
	isPathControl(props) ? (
		<TextareaControlByPath {...props} />
	) : (
		<TextareaControlByValue {...props} />
	);

/**
 * A control component that renders a textarea input based on a path.
 *
 * @template pT - The type of the attributes object.
 *
 * @param path - The path to the value in the attributes object.
 * @returns The rendered TextareaControlByPath component.
 */
function TextareaControlByPath<pT extends object>({
	path,
	updateHandling,
	...props
}: ControlByPath<pT, string> & _TextareaControl): JSX.Element {
	const {attributes, setAttributes} = useControlContext();
	const value = get(attributes, path);

	return (
		<TextareaControlByValue
			updateHandling="by-value"
			value={value}
			setValue={(newValue) => {
				const newAttributes = cloneDeep(attributes);
				set(newAttributes, path, newValue);
				setAttributes(newAttributes);
			}}
			{...props}
		/>
	);
}

/**
 * A control component that renders a textarea input based on a value.
 *
 * @param label - The label for the textarea input.
 * @param value - The value of the textarea input.
 * @param setValue - The function to set the value of the textarea input.
 * @param setDefault - Whether to show the "Set to default" button.
 * @param defaultValue - The default value for the textarea input.
 * @param show - Whether to show the textarea input.
 * @param rows - The number of rows for the textarea input.
 * @returns The rendered TextareaControlByValue component.
 */
const TextareaControlByValue: FC<ControlByValue<string> & _TextareaControl> = ({
	label,
	value,
	setValue,
	setDefault = true,
	defaultValue = "",
	show = true,
	rows = 4,
}) => {
	const contentRows = value ? value.split(/\r\n|\r|\n/).length : rows;
	const textareaRows = contentRows > rows - 1 ? contentRows + 1 : rows;

	return show ? (
		<WPTextareaControl
			label={`${label} ${value === undefined ? " - Default" : ""}`}
			onChange={setValue}
			value={value ?? defaultValue}
			help={
				setDefault &&
				value !== undefined && (
					<button
						onClick={() => {
							setValue(undefined);
						}}
					>
						Set to default
					</button>
				)
			}
			rows={textareaRows}
		/>
	) : null;
};

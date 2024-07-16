import {ComboboxControl as WPComboboxControl} from "@wordpress/components";
import cloneDeep from "lodash.clonedeep";
import get from "lodash.get";
import set from "lodash.set";
import type {FC} from "react";
import React from "react";
import type {Obj} from "../../types";
import {useControlContext} from "../context";
import type {ControlByPath, ControlByValue, ControlType} from "../types";
import {isPathControl} from "../utils";

/**
 * Represents a combobox control component.
 */
type _ComboboxControl = {
	options: {
		label: string;
		value: string;
	}[];
};

/**
 * ComboboxControl component.
 * @param props - The props for the ComboboxControl component.
 * @returns A React component representing a combobox control.
 */
export const ComboboxControl = <pT extends Obj = {}>(
	props: ControlType<string, pT> & _ComboboxControl,
) =>
	isPathControl(props) ? (
		<ComboboxControlByPath {...props} />
	) : (
		<ComboboxControlByValue {...props} />
	);

/**
 * ComboboxControlByPath component.
 * @param props - The props for the ComboboxControlByPath component.
 * @returns A React component representing a combobox control by path.
 */
function ComboboxControlByPath<pT extends Obj>({
	path,
	updateHandling,
	...props
}: ControlByPath<pT, string> & _ComboboxControl): JSX.Element {
	const {attributes, setAttributes} = useControlContext();
	const value = get(attributes, path);

	return (
		<ComboboxControl
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
 * ComboboxControlByValue component.
 * @param props - The props for the ComboboxControlByValue component.
 * @returns A React component representing a combobox control by value.
 */
const ComboboxControlByValue: FC<ControlByValue<string> & _ComboboxControl> = ({
	label,
	value,
	setValue,
	setDefault = true,
	defaultValue = "",
	show = true,
	options,
}) =>
	show ? (
		<WPComboboxControl
			label={`${label} ${value === undefined ? " - Default" : ""}`}
			onChange={(newValue) => {
				newValue ? setValue(newValue) : setValue(undefined);
			}}
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
			options={options}
		/>
	) : null;

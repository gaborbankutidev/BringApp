import React from "react";
import type {FC} from "react";
import {SelectControl as WPSelectControl} from "@wordpress/components";
import get from "lodash.get";
import set from "lodash.set";
import cloneDeep from "lodash.clonedeep";
import type {Obj} from "../../types";
import type {ControlByPath, ControlByValue, ControlType} from "../types";
import {useControlContext} from "../context";
import {isPathControl} from "../utils";

/**
 * Props for the SelectControl component.
 */
type _SelectControl = {
	options: {
		label: string;
		value: string;
	}[];
};

/**
 * A control component that renders a select dropdown.
 *
 * @template pT - The type of additional properties for the control.
 *
 * @param props - The props for the SelectControl component.
 */
export const SelectControl = <pT extends Obj = {}>(
	props: ControlType<string, pT> & _SelectControl,
) =>
	isPathControl(props) ? (
		<SelectControlByPath {...props} />
	) : (
		<SelectControlByValue {...props} />
	);

/**
 * A control component that renders a select dropdown based on a path.
 *
 * @template pT - The type of additional properties for the control.
 *
 * @param props - The props for the SelectControlByPath component.
 */
function SelectControlByPath<pT extends Obj>({
	path,
	updateHandling,
	...props
}: ControlByPath<pT, string> & _SelectControl): JSX.Element {
	const {attributes, setAttributes} = useControlContext();
	const value = get(attributes, path);

	return (
		<SelectControlByValue
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
 * A control component that renders a select dropdown based on a value.
 * @param props - The props for the SelectControlByValue component.
 */
const SelectControlByValue: FC<ControlByValue<string> & _SelectControl> = ({
	label,
	value,
	setValue,
	setDefault = true,
	defaultValue = "",
	show = true,
	options,
}) =>
	show ? (
		<WPSelectControl
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
			options={options}
		/>
	) : null;

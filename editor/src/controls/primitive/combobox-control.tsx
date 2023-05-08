import React from "react";
import type {FC} from "react";
import {ComboboxControl as WPComboboxControl} from "@wordpress/components";
import get from "lodash.get";
import set from "lodash.set";
import cloneDeep from "lodash.clonedeep";
import type {Obj} from "../../types";
import type {ControlByPath, ControlByValue, ControlType} from "../types";
import {useControlContext} from "../context";
import {isPathControl} from "../utils";

type _ComboboxControl = {
	options: {
		label: string;
		value: string;
	}[];
};

export const ComboboxControl = <pT extends Obj = {}>(
	props: ControlType<string, pT> & _ComboboxControl,
) =>
	isPathControl(props) ? (
		<ComboboxControlByPath {...props} />
	) : (
		<ComboboxControlByValue {...props} />
	);

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

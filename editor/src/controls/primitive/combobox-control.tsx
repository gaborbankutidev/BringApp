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

type _SelectControl = {
	options: {
		label: string;
		value: string;
	}[];
};

export const ComboboxControl = <pT extends Obj = {}>(
	props: ControlType<string, pT> & _SelectControl,
) =>
	isPathControl(props) ? (
		<ComboboxControlByPath {...props} />
	) : (
		<ComboboxControlByValue {...props} />
	);

const ComboboxControlByValue: FC<ControlByValue<string> & _SelectControl> = ({
	label,
	value,
	setValue,
	setDefault = true,
	show = true,
	options,
}) =>
	show ? (
		<WPComboboxControl
			label={`${label} ${value === undefined ? " - Default" : ""}`}
			onChange={setValue}
			value={value ?? ""}
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

function ComboboxControlByPath<pT extends Obj>({
	label,
	path,
	setDefault = true,
	show = true,
	options,
}: ControlByPath<pT, string> & _SelectControl): JSX.Element {
	const {attributes, setAttributes} = useControlContext();
	const value = get(attributes, path);

	return show ? (
		<WPComboboxControl
			label={`${label} ${value === undefined ? " - Default" : ""}`}
			value={value ?? ""}
			onChange={(newValue) => {
				const newAttributes = cloneDeep(attributes);
				set(newAttributes, path, newValue);
				setAttributes(newAttributes);
			}}
			help={
				setDefault &&
				value !== undefined && (
					<button
						onClick={() => {
							const newAttributes = cloneDeep(attributes);
							set(newAttributes, path, undefined);
							setAttributes(newAttributes);
						}}
					>
						Set to default
					</button>
				)
			}
			options={options}
		/>
	) : (
		<></>
	);
}

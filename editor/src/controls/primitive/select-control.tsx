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

type _SelectControl = {
	options: {
		label: string;
		value: string;
	}[];
};

export const SelectControl = <pT extends Obj = {}>(
	props: ControlType<string, pT> & _SelectControl,
) =>
	isPathControl(props) ? (
		<SelectControlByPath {...props} />
	) : (
		<SelectControlByValue {...props} />
	);

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

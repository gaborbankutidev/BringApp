import {SelectControl as WPSelectControl} from "@wordpress/components";
import React, {FC} from "react";
import get from "lodash.get";
import set from "lodash.set";
import cloneDeep from "lodash.clonedeep";
import type {Obj} from "../../types";
import type {ControlByPath, ControlByValue, ControlType} from "../types";
import {useControlContext} from "../context";
import {isPathControl} from "../utils";

type _NumberSelectControl = {
	options: {
		label: string;
		value: number;
	}[];
};

export const NumberSelectControl = <pT extends Obj = {}>(
	props: ControlType<number, pT> & _NumberSelectControl,
) =>
	isPathControl(props) ? (
		<NumberSelectControlByPath {...props} />
	) : (
		<NumberSelectControlByValue {...props} />
	);

function NumberSelectControlByPath<pT extends Obj>({
	path,
	updateHandling,
	...props
}: ControlByPath<pT, number> & _NumberSelectControl) {
	const {attributes, setAttributes} = useControlContext();
	const value = get(attributes, path);

	return (
		<NumberSelectControlByValue
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

const NumberSelectControlByValue: FC<
	ControlByValue<number> & _NumberSelectControl
> = ({label, value, setValue, setDefault = true, show = true, options}) =>
	show ? (
		<WPSelectControl
			label={`${label} ${value === undefined ? " - Default" : ""}`}
			onChange={(newValue) => {
				const parsedNewValue = parseInt(newValue);
				if (isNaN(parsedNewValue)) {
					alert("Value can not be set because it's a NaN");
					return;
				}
				setValue(parsedNewValue);
			}}
			value={value ? value.toString() : ""}
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
			options={options.map((opt) => ({...opt, value: opt.value.toString()}))}
		/>
	) : null;
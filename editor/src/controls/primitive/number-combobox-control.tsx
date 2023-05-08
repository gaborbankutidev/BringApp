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

type _NumberComboboxControl = {
	options: {
		label: string;
		value: number;
	}[];
};

export const NumberComboboxControl = <pT extends Obj = {}>(
	props: ControlType<number, pT> & _NumberComboboxControl,
) =>
	isPathControl(props) ? (
		<NumberComboboxControlByPath {...props} />
	) : (
		<NumberComboboxControlByValue {...props} />
	);

function NumberComboboxControlByPath<pT extends Obj>({
	path,
	updateHandling,
	...props
}: ControlByPath<pT, number> & _NumberComboboxControl): JSX.Element {
	const {attributes, setAttributes} = useControlContext();
	const value = get(attributes, path);

	return (
		<NumberComboboxControl
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

const NumberComboboxControlByValue: FC<
	ControlByValue<number> & _NumberComboboxControl
> = ({label, value, setValue, setDefault = true, show = true, options}) =>
	show ? (
		<WPComboboxControl
			label={`${label} ${value === undefined ? " - Default" : ""}`}
			//onChange={setValue}
			onChange={(newValue) => {
				if (!newValue) {
					setValue(undefined);
					return;
				}

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

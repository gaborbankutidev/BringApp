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

const NumberSelectControlByValue: FC<
	ControlByValue<number> & _NumberSelectControl
> = ({label, value, setValue, setDefault = true, show = true, options}) =>
	show ? (
		<WPSelectControl
			label={`${label} ${value === undefined ? " - Default" : ""}`}
			onChange={(newValue) => setValue(JSON.parse(newValue) as number)}
			value={value ? JSON.stringify(value) : ""}
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
			options={options.map((opt) => ({...opt, value: `${opt.value}`}))}
		/>
	) : null;

function NumberSelectControlByPath<pT extends Obj>({
	label,
	path,
	setDefault = true,
	show = true,
	options,
}: ControlByPath<pT, number> & _NumberSelectControl) {
	const {attributes, setAttributes} = useControlContext();
	const value = get(attributes, path);

	return show ? (
		<WPSelectControl
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
			options={options.map((opt) => ({...opt, value: `${opt.value}`}))}
		/>
	) : null;
}

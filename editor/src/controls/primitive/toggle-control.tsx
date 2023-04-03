import React from "react";
import type {FC} from "react";
import {ToggleControl as WPToggleControl} from "@wordpress/components";
import get from "lodash.get";
import set from "lodash.set";
import cloneDeep from "lodash.clonedeep";
import type {Obj} from "../../types";
import type {ControlByPath, ControlByValue, ControlType} from "../types";
import {useControlContext} from "../context";
import {isPathControl} from "../utils";

export const ToggleControl = <pT extends Obj = {}>(
	props: ControlType<boolean, pT>,
) =>
	isPathControl(props) ? (
		<ToggleControlByPath {...props} />
	) : (
		<ToggleControlByValue {...props} />
	);

const ToggleControlByValue: FC<ControlByValue<boolean>> = ({
	label,
	value,
	setValue,
	setDefault = true,
	show = true,
}) =>
	show ? (
		<WPToggleControl
			label={`${label} ${value === undefined ? " - Default" : ""}`}
			onChange={setValue}
			checked={value ?? false}
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
		/>
	) : null;

function ToggleControlByPath<pT extends Obj>({
	label,
	path,
	setDefault = true,
	show = true,
}: ControlByPath<pT, boolean>): JSX.Element {
	const {attributes, setAttributes} = useControlContext();
	const value = get(attributes, path);

	return show ? (
		<WPToggleControl
			label={`${label} ${value === undefined ? " - Default" : ""}`}
			checked={value ?? false}
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
		/>
	) : (
		<></>
	);
}

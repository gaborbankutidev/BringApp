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

function ToggleControlByPath<pT extends Obj>({
	path,
	updateHandling,
	...props
}: ControlByPath<pT, boolean>): JSX.Element {
	const {attributes, setAttributes} = useControlContext();
	const value = get(attributes, path);

	return (
		<ToggleControlByValue
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

const ToggleControlByValue: FC<ControlByValue<boolean>> = ({
	label,
	value,
	setValue,
	setDefault = true,
	defaultValue = false,
	show = true,
}) =>
	show ? (
		<WPToggleControl
			label={`${label} ${value === undefined ? " - Default" : ""}`}
			onChange={setValue}
			checked={value ?? defaultValue}
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

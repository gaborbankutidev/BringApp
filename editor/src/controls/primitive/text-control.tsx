import React from "react";
import type {FC} from "react";
import {TextControl as WPTextControl} from "@wordpress/components";
import get from "lodash.get";
import set from "lodash.set";
import cloneDeep from "lodash.clonedeep";
import type {Obj} from "../../types";
import type {ControlByPath, ControlByValue, ControlType} from "../types";
import {useControlContext} from "../context";
import {isPathControl} from "../utils";

export const TextControl = <pT extends Obj = {}>(
	props: ControlType<string, pT>,
) =>
	isPathControl(props) ? (
		<TextControlByPath {...props} />
	) : (
		<TextControlByValue {...props} />
	);

function TextControlByPath<pT extends Obj>({
	path,
	updateHandling,
	...props
}: ControlByPath<pT, string>): JSX.Element {
	const {attributes, setAttributes} = useControlContext();
	const value = get(attributes, path);

	return (
		<TextControlByValue
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

const TextControlByValue: FC<ControlByValue<string>> = ({
	label,
	value,
	setValue,
	setDefault = true,
	defaultValue = "",
	show = true,
}) =>
	show ? (
		<WPTextControl
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
			type="text"
		/>
	) : null;

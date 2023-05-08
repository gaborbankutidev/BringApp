import React from "react";
import type {FC} from "react";
import {TextareaControl as WPTextareaControl} from "@wordpress/components";
import get from "lodash.get";
import set from "lodash.set";
import cloneDeep from "lodash.clonedeep";
import type {Obj} from "../../types";
import type {ControlByPath, ControlByValue, ControlType} from "../types";
import {useControlContext} from "../context";
import {isPathControl} from "../utils";

type _TextareaControl = {rows?: number};

export const TextareaControl = <pT extends Obj = {}>(
	props: ControlType<string, pT> & _TextareaControl,
) =>
	isPathControl(props) ? (
		<TextareaControlByPath {...props} />
	) : (
		<TextareaControlByValue {...props} />
	);

function TextareaControlByPath<pT extends Obj>({
	path,
	updateHandling,
	...props
}: ControlByPath<pT, string> & _TextareaControl): JSX.Element {
	const {attributes, setAttributes} = useControlContext();
	const value = get(attributes, path);

	return (
		<TextareaControlByValue
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

const TextareaControlByValue: FC<ControlByValue<string> & _TextareaControl> = ({
	label,
	value,
	setValue,
	setDefault = true,
	defaultValue = "",
	show = true,
	rows = 4,
}) => {
	const contentRows = value ? value.split(/\r\n|\r|\n/).length : rows;
	const textareaRows = contentRows > rows - 1 ? contentRows + 1 : rows;

	return show ? (
		<WPTextareaControl
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
			rows={textareaRows}
		/>
	) : null;
};

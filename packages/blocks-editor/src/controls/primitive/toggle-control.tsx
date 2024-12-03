import {ToggleControl as WPToggleControl} from "@wordpress/components";
import cloneDeep from "lodash.clonedeep";
import get from "lodash.get";
import set from "lodash.set";
import type {FC} from "react";
import React from "react";
import {useControlContext} from "../context";
import type {ControlByPath, ControlByValue, ControlType} from "../types";
import {isPathControl} from "../utils";

/**
 * A control component that renders a toggle input.
 *
 * @template pT - The type of the attributes object.
 *
 * @param props - The props for the ToggleControl component.
 * @returns The rendered ToggleControl component.
 */
export const ToggleControl = <pT extends object = object>(props: ControlType<boolean, pT>) =>
	isPathControl(props) ? <ToggleControlByPath {...props} /> : <ToggleControlByValue {...props} />;

/**
 * A control component that renders a toggle input based on a path.
 *
 * @template pT - The type of the attributes object.
 *
 * @param path - The path to the value in the attributes object.
 * @param updateHandling - The update handling strategy.
 * @param props - The rest of the props for the ToggleControlByPath component.
 * @returns The rendered ToggleControlByPath component.
 */
function ToggleControlByPath<pT extends object>({
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

/**
 * A control component that renders a toggle input based on a value.
 *
 * @param label - The label for the toggle input.
 * @param value - The value of the toggle input.
 * @param setValue - The function to set the value of the toggle input.
 * @param setDefault - Whether to show the "Set to default" button.
 * @param defaultValue - The default value for the toggle input.
 * @param show - Whether to show the toggle input.
 * @returns The rendered ToggleControlByValue component.
 */
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

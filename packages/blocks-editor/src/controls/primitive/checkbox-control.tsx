import { CheckboxControl as WPCheckboxControl } from "@wordpress/components"
import cloneDeep from "lodash.clonedeep"
import get from "lodash.get"
import set from "lodash.set"
import type { FC } from "react"
import React from "react"
import { useControlContext } from "../context"
import type { ControlByPath, ControlByValue, ControlType } from "../types"
import { isPathControl } from "../utils"

/**
 * CheckboxControl component.
 * Renders a checkbox control based on the provided props.
 * @param props - The props for the CheckboxControl component.
 * @returns The rendered CheckboxControl component.
 */
export const CheckboxControl = <pT extends object = object>(props: ControlType<boolean, pT>) =>
	isPathControl(props) ? (
		<CheckboxControlByPath {...props} />
	) : (
		<CheckboxControlByValue {...props} />
	)

/**
 * CheckboxControlByPath component.
 * Renders a checkbox control based on the provided path.
 * @param path - The path to the value in the attributes object.
 * @param updateHandling - The update handling strategy.
 * @param props - The props for the CheckboxControlByPath component.
 * @returns The rendered CheckboxControlByPath component.
 */
function CheckboxControlByPath<pT extends object>({
	path,
	updateHandling,
	...props
}: ControlByPath<pT, boolean>): JSX.Element {
	const { attributes, setAttributes } = useControlContext()
	const value = get(attributes, path)

	return (
		<CheckboxControlByValue
			updateHandling="by-value"
			value={value}
			setValue={(newValue) => {
				const newAttributes = cloneDeep(attributes)
				set(newAttributes, path, newValue)
				setAttributes(newAttributes)
			}}
			{...props}
		/>
	)
}

/**
 * CheckboxControlByValue component.
 * Renders a checkbox control based on the provided value.
 * @param label - The label for the checkbox control.
 * @param value - The value of the checkbox control.
 * @param setValue - The function to set the value of the checkbox control.
 * @param setDefault - Whether to show the "Set to default" button.
 * @param defaultValue - The default value for the checkbox control.
 * @param show - Whether to show the checkbox control.
 * @returns The rendered CheckboxControlByValue component.
 */
const CheckboxControlByValue: FC<ControlByValue<boolean>> = ({
	label,
	value,
	setValue,
	setDefault = true,
	defaultValue = false,
	show = true,
}) =>
	show ? (
		<WPCheckboxControl
			label={`${label} ${value === undefined ? " - Default" : ""}`}
			onChange={setValue}
			checked={value ?? defaultValue}
			help={
				setDefault &&
				value !== undefined && (
					<button
						onClick={() => {
							setValue(undefined)
						}}
					>
						Set to default
					</button>
				)
			}
		/>
	) : null

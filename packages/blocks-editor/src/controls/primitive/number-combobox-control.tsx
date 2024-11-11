import { ComboboxControl as WPComboboxControl } from "@wordpress/components"
import cloneDeep from "lodash.clonedeep"
import get from "lodash.get"
import set from "lodash.set"
import type { FC } from "react"
import React from "react"
import type { Obj } from "../../types"
import { useControlContext } from "../context"
import type { ControlByPath, ControlByValue, ControlType } from "../types"
import { isPathControl } from "../utils"

/**
 * Options for the NumberComboboxControl component.
 */
type _NumberComboboxControl = {
	options: {
		label: string
		value: number
	}[]
}

/**
 * A control component that combines a number input with a combobox.
 * @param props - The control props.
 * @returns The rendered NumberComboboxControl component.
 */
export const NumberComboboxControl = <pT extends Obj = {}>(
	props: ControlType<number, pT> & _NumberComboboxControl
) =>
	isPathControl(props) ? (
		<NumberComboboxControlByPath {...props} />
	) : (
		<NumberComboboxControlByValue {...props} />
	)

/**
 * A control component that combines a number input with a combobox, using a path to access the value in the attributes object.
 * @param path - The path to the value in the attributes object.
 * @param updateHandling - The update handling strategy.
 * @param props - The control props.
 * @returns The rendered NumberComboboxControlByPath component.
 */
function NumberComboboxControlByPath<pT extends Obj>({
	path,
	updateHandling,
	...props
}: ControlByPath<pT, number> & _NumberComboboxControl): JSX.Element {
	const { attributes, setAttributes } = useControlContext()
	const value = get(attributes, path)

	return (
		<NumberComboboxControl
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
 * A control component that combines a number input with a combobox, using a value prop.
 * @param label - The label for the control.
 * @param value - The value of the control.
 * @param setValue - The function to set the value of the control.
 * @param setDefault - Whether to show the "Set to default" button.
 * @param show - Whether to show the control.
 * @param options - The options for the combobox.
 * @returns The rendered NumberComboboxControlByValue component.
 */
const NumberComboboxControlByValue: FC<ControlByValue<number> & _NumberComboboxControl> = ({
	label,
	value,
	setValue,
	setDefault = true,
	show = true,
	options,
}) =>
	show ? (
		<WPComboboxControl
			label={`${label} ${value === undefined ? " - Default" : ""}`}
			//onChange={setValue}
			onChange={(newValue) => {
				if (!newValue) {
					setValue(undefined)
					return
				}

				const parsedNewValue = parseInt(newValue)
				if (isNaN(parsedNewValue)) {
					alert("Value can not be set because it's a NaN")
					return
				}

				setValue(parsedNewValue)
			}}
			value={value ? value.toString() : ""}
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
			options={options.map((opt) => ({ ...opt, value: opt.value.toString() }))}
		/>
	) : null

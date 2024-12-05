import { TextControl as WPTextControl } from "@wordpress/components"
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
 * A control component that renders a text input.
 *
 * @template pT - The type of the attributes object.
 *
 * @param props - The props for the TextControl component.
 */
export const TextControl = <pT extends Obj = {}>(props: ControlType<string, pT>) =>
	isPathControl(props) ? <TextControlByPath {...props} /> : <TextControlByValue {...props} />

/**
 * A control component that renders a text input based on a path.
 *
 * @template pT - The type of the attributes object.
 *
 * @param path - The path to the value in the attributes object.
 * @param updateHandling - The update handling strategy.
 * @param props - The rest of the props for the TextControlByPath component.
 * @returns The rendered TextControlByPath component.
 */
function TextControlByPath<pT extends Obj>({
	path,
	updateHandling,
	...props
}: ControlByPath<pT, string>): JSX.Element {
	const { attributes, setAttributes } = useControlContext()
	const value = get(attributes, path)

	return (
		<TextControlByValue
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
 * A control component that renders a text input based on a value.
 *
 * @param label - The label for the text input.
 * @param value - The value of the text input.
 * @param setValue - The function to set the value of the text input.
 * @param setDefault - Whether to show the "Set to default" button.
 * @param defaultValue - The default value for the text input.
 * @param show - Whether to show the text input.
 * @returns The rendered TextControlByValue component.
 */
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
							setValue(undefined)
						}}
					>
						Set to default
					</button>
				)
			}
			type="text"
		/>
	) : null

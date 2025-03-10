import { RangeControl as WPRangeControl } from "@wordpress/components"
import cloneDeep from "lodash.clonedeep"
import get from "lodash.get"
import set from "lodash.set"
import type { FC } from "react"
import React from "react"
import { useControlContext } from "../context"
import type { ControlByPath, ControlByValue, ControlType } from "../types"
import { isPathControl } from "../utils"

type _NumberControl = { min?: number; max?: number }

/**
 * A custom range control component.
 *
 * @template pT - The type of additional properties for the control.
 */
export const RangeControl = <pT extends object = object>(
	props: ControlType<number, pT> & _NumberControl
) => (isPathControl(props) ? <RangeControlByPath {...props} /> : <RangeControlByValue {...props} />)

/**
 * A range control component that works with a control path.
 *
 * @template pT - The type of additional properties for the control.
 *
 * @param props - The props for the RangeControlByPath component.
 * @returns The rendered RangeControlByPath component.
 *
 */
function RangeControlByPath<pT extends object>({
	path,
	updateHandling,
	...props
}: ControlByPath<pT, number> & _NumberControl): JSX.Element {
	const { attributes, setAttributes } = useControlContext()
	const value = get(attributes, path)

	return (
		<RangeControlByValue
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
 * A range control component that works with a control value.
 * @param props - The props for the RangeControlByValue component.
 */
const RangeControlByValue: FC<ControlByValue<number> & _NumberControl> = ({
	label,
	value,
	setValue,
	setDefault = true,
	defaultValue = 0,
	show = true,
	min,
	max,
}) =>
	show ? (
		<>
			<WPRangeControl
				label={`${label} ${value === undefined ? " - Default" : ""}`}
				value={value ?? defaultValue}
				onChange={setValue}
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
				min={min}
				max={max}
			/>
		</>
	) : null

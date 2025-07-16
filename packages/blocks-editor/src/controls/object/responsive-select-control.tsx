import { Button, Icon } from "@wordpress/components"
import cloneDeep from "lodash.clonedeep"
import get from "lodash.get"
import set from "lodash.set"
import type { FC } from "react"
import React, { useState } from "react"
import { SelectControl } from ".."
import type { ResponsiveLabels, ResponsiveValue } from "../../styles/types"
import { screenSizes } from "../../styles/utils"
import { objectKeys } from "../../utils"
import { useControlContext } from "../context"
import type { ControlByPath, ControlByValue, ControlType } from "../types"
import { isPathControl } from "../utils"

/**
 * Props for the ResponsiveSelectControl component.
 */
type _SelectControl = {
	options: {
		label: string
		value: string
	}[]
}

/**
 * A control component that renders a responsive select control.
 *
 * @template pT - The type of the attributes object.
 *
 * @param props - The props for the ResponsiveSelectControl component.
 * @returns The rendered ResponsiveSelectControl component.
 */
export const ResponsiveSelectControl = <pT extends object = object>(
	props: ControlType<ResponsiveValue<string>, pT> & _SelectControl
) =>
	isPathControl(props) ? (
		<ResponsiveSelectControlByPath {...props} />
	) : (
		<ResponsiveSelectControlByValue {...props} />
	)

/**
 * A control component that renders a responsive select control based on a path.
 *
 * @template pT - The type of the attributes object.
 *
 * @param path - The path to the value in the attributes object.
 * @param updateHandling - The update handling strategy.
 * @returns The rendered ResponsiveSelectControlByPath component.
 */
function ResponsiveSelectControlByPath<pT extends object>({
	path,
	updateHandling,
	...props
}: ControlByPath<pT, ResponsiveValue<string>> & _SelectControl) {
	const { attributes, setAttributes } = useControlContext()
	const value = get(attributes, path)

	return (
		<ResponsiveSelectControlByValue
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
 * A control component that renders a responsive select control based on a value.
 *
 * @param label - The label for the select input.
 * @param value - The value of the select input.
 * @param setValue - The function to set the value of the select input.
 * @param show - Whether to show the select input.
 * @param updateHandling - The update handling strategy.
 * @param defaultValue - The default value for the select input.
 * @param props - The rest of the props for the ResponsiveSelectControlByValue component.
 * @returns The rendered ResponsiveSelectControlByValue component.
 */
const ResponsiveSelectControlByValue: FC<
	ControlByValue<ResponsiveValue<string>> & _SelectControl
> = ({ label, value = {}, setValue, show = true, updateHandling, defaultValue, ...props }) => {
	const [selectedSize, setSelectedSize] = useState<keyof ResponsiveLabels>("")

	return show ? (
		<>
			<div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
				{objectKeys(screenSizes).map((screenSize) => (
					<Button
						key={screenSize}
						variant={selectedSize === screenSize ? "primary" : "secondary"}
						icon={<Icon icon={screenSizes[screenSize].icon} />}
						onClick={() => setSelectedSize(screenSize)}
						size="small"
						className="responsive-screen-select-button"
					>
						{value[screenSize] !== undefined
							? value[screenSize]
							: (defaultValue?.[screenSize] ?? "-")}
					</Button>
				))}
			</div>

			<SelectControl
				updateHandling="by-value"
				label={`${label} - ${screenSizes[selectedSize].label}`}
				value={value ? value[selectedSize] : undefined}
				setValue={(newValue) => {
					const newObject = { ...value }
					newObject[selectedSize] = newValue
					setValue(newObject)
				}}
				defaultValue={defaultValue ? (defaultValue[selectedSize] ?? undefined) : undefined}
				{...props}
			/>
		</>
	) : null
}

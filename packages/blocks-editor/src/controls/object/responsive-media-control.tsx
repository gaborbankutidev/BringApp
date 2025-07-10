import { Button, Icon } from "@wordpress/components"
import cloneDeep from "lodash.clonedeep"
import get from "lodash.get"
import set from "lodash.set"
import type { FC } from "react"
import React, { useState } from "react"
import { MediaControl } from ".."
import type { ResponsiveLabels, ResponsiveValue } from "../../styles/types"
import { screenSizes } from "../../styles/utils"
import type { MediaType } from "../../types"
import { objectKeys } from "../../utils"
import { useControlContext } from "../context"
import type { ControlByPath, ControlByValue, ControlType } from "../types"
import { isPathControl } from "../utils"

type MediaOption = string[]

/**
 * Props for the MediaControl component.
 * @property allowedTypes - The allowed media types.
 * @property Preview - The preview component for the media.
 */
type MediaControlProps = {
	allowedTypes?: MediaOption
	Preview?: React.FC<MediaType>
}

/**
 * A control component that renders a responsive media control.
 *
 * @template pT - The type of the attributes object.
 *
 * @param props - The props for the ResponsiveMediaControl component.
 * @returns The rendered ResponsiveMediaControl component.
 */
export const ResponsiveMediaControl = <pT extends object = object>(
	props: ControlType<ResponsiveValue<MediaType>, pT> & MediaControlProps
) =>
	isPathControl(props) ? (
		<ResponsiveMediaControlByPath {...props} />
	) : (
		<ResponsiveMediaControlByValue {...props} />
	)

/**
 * A control component that renders a responsive media control based on a path.
 *
 * @template pT - The type of the attributes object.
 *
 * @param path - The path to the value in the attributes object.
 * @param updateHandling - The update handling strategy.
 * @returns The rendered ResponsiveMediaControlByPath component.
 */
function ResponsiveMediaControlByPath<pT extends object>({
	path,
	updateHandling,
	...props
}: ControlByPath<pT, ResponsiveValue<MediaType>> & MediaControlProps) {
	const { attributes, setAttributes } = useControlContext()
	const value = get(attributes, path)

	return (
		<ResponsiveMediaControlByValue
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
 * A control component that renders a responsive media control based on a value.
 *
 * @param label - The label for the media input.
 * @param value - The value of the media input.
 * @param setValue - The function to set the value of the media input.
 * @param show - Whether to show the media input.
 * @param updateHandling - The update handling strategy.
 * @param defaultValue - The default value for the media input.
 * @param props - The rest of the props for the ResponsiveMediaControlByValue component.
 * @returns The rendered ResponsiveMediaControlByValue component.
 */
const ResponsiveMediaControlByValue: FC<
	ControlByValue<ResponsiveValue<MediaType>> & MediaControlProps
> = ({ label, value = {}, setValue, show = true, updateHandling, defaultValue, ...props }) => {
	const [selectedSize, setSelectedSize] = useState<keyof ResponsiveLabels>("")

	return show ? (
		<>
			<div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
				{objectKeys(screenSizes).map((screenSize) => (
					<Button
						variant={selectedSize === screenSize ? "primary" : "secondary"}
						icon={<Icon icon={screenSizes[screenSize].icon} />}
						onClick={() => setSelectedSize(screenSize)}
						size="small"
						className="responsive-screen-select-button"
					>
						{value[screenSize]?.src ? "✓" : "-"}
					</Button>
				))}
			</div>

			<MediaControl
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

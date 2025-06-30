import React from "react"
import { ResponsiveValue } from "../../styles/types"
import type { ImageType } from "../../types"
import type { ControlType } from "../types"
import { ResponsiveMediaControl } from "./responsive-media-control"

/**
 *	A control component that renders an image input.
 *
 * @template pT - The type of the attributes object.
 *
 * @param props - The props for the ImageControl component.
 * @returns The rendered ImageControl component.
 */
export const ResponsiveImageControl = <pT extends object = object>(
	props: ControlType<ResponsiveValue<ImageType>, pT>
) => (
	<ResponsiveMediaControl
		Preview={(value) => (
			<div>
				<img src={value.src} alt={value.alt ?? ""} />
			</div>
		)}
		allowedTypes={["image"]}
		{...props}
	/>
)

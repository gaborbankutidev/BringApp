import React from "react";
import type {ImageType, Obj} from "../../types";
import type {ControlType} from "../types";
import {MediaControl} from "./media-control";

/**
 *	A control component that renders an image input.
 *
 * @template pT - The type of the attributes object.
 *
 * @param props - The props for the ImageControl component.
 * @returns The rendered ImageControl component.
 */
export const ImageControl = <pT extends Obj = {}>(
	props: ControlType<ImageType, pT>,
) => (
	<MediaControl
		Preview={(value) => (
			<div>
				<img src={value.src} alt={value.alt ?? ""} />
			</div>
		)}
		allowedTypes={["image"]}
		{...props}
	/>
);

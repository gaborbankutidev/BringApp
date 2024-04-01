import React from "react";
import type {ImageType, Obj} from "../../types";
import type {ControlType} from "../types";
import {MediaControl} from "./media-control";

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

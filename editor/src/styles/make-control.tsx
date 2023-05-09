import React from "react";
import type {FC} from "react";
import {PanelBody} from "@wordpress/components";
import type {BringStylesConfig, Sides} from "./types";
import {objectKeys} from "../utils";
import {ResponsiveCheckboxControl, ResponsiveRangeControl} from "../controls";
import {sideLabels, spacingLabels} from "./utils";

export function makeBringStylesControl(bringStylesConfig: BringStylesConfig) {
	const m = bringStylesConfig.spacing?.m;
	const p = bringStylesConfig.spacing?.p;
	const v = bringStylesConfig.visibility;

	return () => (
		<>
			{m && (
				<PanelBody title="Margin" initialOpen={false}>
					<SidesControl type="m" sides={m} />
				</PanelBody>
			)}
			{p && (
				<PanelBody title="Padding" initialOpen={false}>
					<SidesControl type="p" sides={p} />
				</PanelBody>
			)}
			{v && (
				<PanelBody title="Visibility" initialOpen={false}>
					<ResponsiveCheckboxControl<Record<string, any>>
						label="Visibility"
						path="bringStyles.visibility"
					/>
				</PanelBody>
			)}
		</>
	);
}

const SidesControl: FC<{type: "m" | "p"; sides: Sides}> = ({type, sides}) => (
	<>
		{objectKeys(sides).map((side) => (
			<ResponsiveRangeControl<Record<string, any>>
				label={`${spacingLabels[type]} ${sideLabels[side]}`}
				path={`bringStyles.spacing.${type}.${side}`}
			/>
		))}
	</>
);
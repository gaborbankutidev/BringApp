import {objectKeys} from "../utils";
import {screenSizes} from "./utils";
import type {BringStyles, BringStylesConfig, Sides} from "./types";
import {BringStylesClassNames, ResponsiveValue} from "../client-types";

export const makeBringStylesClassNames = (
	bringStylesConfig: BringStylesConfig,
	bringStyles?: BringStyles,
): BringStylesClassNames => {
	const marginClassNames: string[] = [];
	const paddingClassNames: string[] = [];
	const visibilityClassNames: string[] = [];
	const classNames: string[] = [];

	const addClassName = (
		spacing: "m" | "p",
		side: keyof Sides,
		size: keyof ResponsiveValue,
		value?: number,
	) => {
		if (value === undefined) {
			return;
		}

		const s = size ? `${size}:${spacing}${side}-${value}` : `${spacing}${side}-${value}`;

		spacing === "m" ? marginClassNames.push(s) : paddingClassNames.push(s);
		classNames.push(s);
	};

	// margin
	const mC = bringStylesConfig?.spacing?.m;
	const mV = bringStyles?.spacing?.m;
	mC &&
		objectKeys(mC).map((side) => {
			objectKeys(screenSizes).map((size) =>
				addClassName(
					"m",
					side,
					size,
					mV && mV[side] && mV[side]![size] !== undefined ? mV[side]![size] : mC[side]![size],
				),
			);
		});

	// padding
	const pC = bringStylesConfig?.spacing?.p;
	const pV = bringStyles?.spacing?.p;
	pC &&
		objectKeys(pC).map((side) => {
			objectKeys(screenSizes).map((size) =>
				addClassName(
					"p",
					side,
					size,
					pV && pV[side] && pV[side]![size] !== undefined ? pV[side]![size] : pC[side]![size],
				),
			);
		});

	// visibility
	const vC = bringStylesConfig?.visibility;
	const vV = bringStyles?.visibility;
	vC &&
		objectKeys(vC).map((size) => {
			const v = (size ? `${size}:` : "") + (vV && vV[size] ? "hidden" : vC[size]);

			visibilityClassNames.push(v);
			classNames.push(v);
		});

	return {
		spacing: {
			m: marginClassNames.join(" "),
			p: paddingClassNames.join(" "),
		},
		visibility: visibilityClassNames.join(" "),
		classNames: classNames.join(" "),
	};
};

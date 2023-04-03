import {objectKeys} from "../utils";
import {screenSizes} from "./utils";
import type {
	BringStyles,
	BringStylesConfig,
	ResponsiveValue,
	Sides,
} from "./types";

export const makeBringStylesClassNames = (
	bringStylesConfig: BringStylesConfig,
	bringStyles?: BringStyles,
) => {
	const ClassNames: string[] = [];
	const addClassName = (
		spacing: "m" | "p",
		side: keyof Sides,
		size: keyof ResponsiveValue,
		value?: number,
	) =>
		value !== undefined &&
		ClassNames.push(
			size
				? `${size}:${spacing}${side}-${value}`
				: `${spacing}${side}-${value}`,
		);

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
					mV && mV[side] && mV[side]![size] !== undefined
						? mV[side]![size]
						: mC[side]![size],
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
					pV && pV[side] && pV[side]![size] !== undefined
						? pV[side]![size]
						: pC[side]![size],
				),
			);
		});

	// visibility
	const vC = bringStylesConfig?.visibility;
	const vV = bringStyles?.visibility;
	vC &&
		objectKeys(vC).map((size) =>
			ClassNames.push(
				(size ? `${size}:` : "") + (vV && vV[size] ? "hidden" : vC[size]),
			),
		);

	return ClassNames.join(" ");
};

export const makeResponsiveClassNames = (
	className: string,
	responsiveValue: ResponsiveValue,
	responsiveConfig: ResponsiveValue = {},
) => {
	const ClassNames: string[] = [];

	const addClassName = (size: keyof ResponsiveValue, value?: number) =>
		value !== undefined &&
		ClassNames.push(
			size ? `${size}:${className}-${value}` : `${className}-${value}`,
		);

	objectKeys(screenSizes).map((size) =>
		addClassName(size, responsiveValue[size] ?? responsiveConfig[size]),
	);

	return ClassNames.join(" ");
};

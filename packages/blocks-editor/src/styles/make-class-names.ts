import { objectKeys } from "../utils"
import type { BlockStyles, BlockStylesClassNames, BlockStylesConfig, Sides } from "./types"
import { ResponsiveValue } from "./types"
import { screenSizes } from "./utils"

/**
 * Makes block styles class names from the config and values set in the editor.
 * @param className
 * @param blockStylesConfig
 * @param blockStyles
 * @returns The objects with the class names strings
 */
export const makeBlockStylesClassNames = (
	className = "",
	blockStylesConfig?: BlockStylesConfig,
	blockStyles?: BlockStyles
): BlockStylesClassNames => {
	const marginClassNames: string[] = []
	const paddingClassNames: string[] = []
	const visibilityClassNames: string[] = []

	const addClassName = (
		spacing: "m" | "p",
		side: keyof Sides,
		size: keyof ResponsiveValue,
		value?: number
	) => {
		if (value === undefined) {
			return
		}

		const s = size ? `${size}:${spacing}${side}-${value}` : `${spacing}${side}-${value}`

		spacing === "m" ? marginClassNames.push(s) : paddingClassNames.push(s)
	}

	// margin
	const mC = blockStylesConfig?.spacing?.m
	const mV = blockStyles?.spacing?.m
	mC &&
		objectKeys(mC).map((side) => {
			objectKeys(screenSizes).map((size) =>
				addClassName(
					"m",
					side,
					size,
					mV && mV[side] && mV[side]![size] !== undefined ? mV[side]![size] : mC[side]![size]
				)
			)
		})

	// padding
	const pC = blockStylesConfig?.spacing?.p
	const pV = blockStyles?.spacing?.p
	pC &&
		objectKeys(pC).map((side) => {
			objectKeys(screenSizes).map((size) =>
				addClassName(
					"p",
					side,
					size,
					pV && pV[side] && pV[side]![size] !== undefined ? pV[side]![size] : pC[side]![size]
				)
			)
		})

	// visibility
	const vC = blockStylesConfig?.visibility
	const vV = blockStyles?.visibility
	vC &&
		objectKeys(vC).map((size) => {
			const v = (size ? `${size}:` : "") + (vV && vV[size] ? "hidden" : vC[size])

			visibilityClassNames.push(v)
		})

	return {
		spacing: {
			m: marginClassNames.join(" "),
			p: paddingClassNames.join(" "),
		},
		visibility: visibilityClassNames.join(" "),
		className,
	}
}

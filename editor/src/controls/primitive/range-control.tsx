import React from "react";
import type {FC} from "react";
import {RangeControl as WPRangeControl} from "@wordpress/components";
import get from "lodash.get";
import set from "lodash.set";
import cloneDeep from "lodash.clonedeep";
import type {Obj} from "../../types";
import type {ControlByPath, ControlByValue, ControlType} from "../types";
import {useControlContext} from "../context";
import {isPathControl} from "../utils";

type _NumberControl = {min?: number; max?: number};

export const RangeControl = <pT extends Obj = {}>(
	props: ControlType<number, pT> & _NumberControl,
) =>
	isPathControl(props) ? (
		<RangeControlByPath {...props} />
	) : (
		<RangeControlByValue {...props} />
	);

function RangeControlByPath<pT extends Obj>({
	label,
	path,
	setDefault = true,
	show = true,
	min,
	max,
}: ControlByPath<pT, number> & _NumberControl): JSX.Element {
	const {attributes, setAttributes} = useControlContext();
	const value = get(attributes, path);

	return show ? (
		<WPRangeControl
			label={`${label} ${value === undefined ? " - Default" : ""}`}
			value={value ?? 0}
			onChange={(newValue) => {
				const newAttributes = cloneDeep(attributes);
				set(newAttributes, path, newValue);
				setAttributes(newAttributes);
			}}
			help={
				setDefault &&
				value !== undefined && (
					<button
						onClick={() => {
							const newAttributes = cloneDeep(attributes);
							set(newAttributes, path, undefined);
							setAttributes(newAttributes);
						}}
					>
						Set to default
					</button>
				)
			}
			min={min}
			max={max}
		/>
	) : (
		<></>
	);
}

const RangeControlByValue: FC<ControlByValue<number> & _NumberControl> = ({
	label,
	value,
	setValue,
	setDefault = true,
	show = true,
	min,
	max,
}) =>
	show ? (
		<>
			<WPRangeControl
				label={`${label} ${value === undefined ? " - Default" : ""}`}
				value={value ?? 0}
				onChange={setValue}
				help={
					setDefault &&
					value !== undefined && (
						<button
							onClick={() => {
								setValue(undefined);
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
	) : null;

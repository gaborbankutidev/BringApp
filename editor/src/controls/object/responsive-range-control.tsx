import React, {useState} from "react";
import type {FC} from "react";
import {Button, Icon} from "@wordpress/components";
import get from "lodash.get";
import set from "lodash.set";
import cloneDeep from "lodash.clonedeep";
import type {Obj} from "../../types";
import type {ControlByPath, ControlByValue, ControlType} from "../types";
import {useControlContext} from "../context";
import {RangeControl} from "..";
import {isPathControl} from "../utils";
import {objectKeys} from "../../utils";
import {screenSizes} from "../../styles/utils";
import type {ResponsiveLabels} from "../../styles/types";
import type {ResponsiveValue} from "@bring/blocks-client";

type _NumberControl = {min?: number; max?: number};

export const ResponsiveRangeControl = <pT extends Obj = {}>(
	props: ControlType<ResponsiveValue, pT> & _NumberControl,
) =>
	isPathControl(props) ? (
		<ResponsiveRangeControlByPath {...props} />
	) : (
		<ResponsiveRangeControlByValue {...props} />
	);

function ResponsiveRangeControlByPath<pT extends Obj>({
	path,
	updateHandling,
	...props
}: ControlByPath<pT, ResponsiveValue> & _NumberControl) {
	const {attributes, setAttributes} = useControlContext();
	const value = get(attributes, path);

	return (
		<ResponsiveRangeControlByValue
			updateHandling="by-value"
			value={value}
			setValue={(newValue) => {
				const newAttributes = cloneDeep(attributes);
				set(newAttributes, path, newValue);
				setAttributes(newAttributes);
			}}
			{...props}
		/>
	);
}

const ResponsiveRangeControlByValue: FC<ControlByValue<ResponsiveValue>> = ({
	label,
	value = {},
	setValue,
	show = true,
	updateHandling,
	defaultValue,
	...props
}) => {
	const [selectedSize, setSelectedSize] = useState<keyof ResponsiveLabels>("");

	return show ? (
		<>
			<div style={{display: "flex", gap: "16px", marginBottom: "16px"}}>
				{objectKeys(screenSizes).map((screenSize) => (
					<Button
						variant={selectedSize === screenSize ? "primary" : "secondary"}
						icon={<Icon icon={screenSizes[screenSize].icon} />}
						onClick={() => setSelectedSize(screenSize)}
						isSmall={true}
						className="responsive-screen-select-button"
					>
						{value[screenSize] !== undefined ? value[screenSize] : "-"}
					</Button>
				))}
			</div>

			<RangeControl
				updateHandling="by-value"
				label={`${label} - ${screenSizes[selectedSize].label}`}
				value={value ? value[selectedSize] : 0}
				setValue={(newValue) => {
					const newObject = {...value};
					newObject[selectedSize] = newValue;
					setValue(newObject);
				}}
				defaultValue={defaultValue ? defaultValue[selectedSize] : 0}
				{...props}
			/>
		</>
	) : null;
};

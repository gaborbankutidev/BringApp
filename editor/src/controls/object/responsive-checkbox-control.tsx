import React, {useState} from "react";
import type {FC} from "react";
import {Button, Icon} from "@wordpress/components";
import get from "lodash.get";
import set from "lodash.set";
import cloneDeep from "lodash.clonedeep";
import type {Obj} from "../../types";
import type {ControlByPath, ControlByValue, ControlType} from "../types";
import {useControlContext} from "../context";
import {CheckboxControl} from "..";
import {isPathControl} from "../utils";
import {objectKeys} from "../../utils";
import {screenSizes} from "../../styles/utils";
import type {ResponsiveLabels} from "../../styles/types";
import type {ResponsiveValue} from "@bring/blocks-client";

export const ResponsiveCheckboxControl = <pT extends Obj = {}>(
	props: ControlType<ResponsiveValue<boolean>, pT>,
) =>
	isPathControl(props) ? (
		<ResponsiveCheckboxControlByPath {...props} />
	) : (
		<ResponsiveCheckboxControlByValue {...props} />
	);

function ResponsiveCheckboxControlByPath<pT extends Obj>({
	path,
	updateHandling,
	...props
}: ControlByPath<pT, ResponsiveValue<boolean>>) {
	const {attributes, setAttributes} = useControlContext();
	const value = get(attributes, path);

	return (
		<ResponsiveCheckboxControlByValue
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

const ResponsiveCheckboxControlByValue: FC<
	ControlByValue<ResponsiveValue<boolean>>
> = ({
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
						style={{
							paddingRight: "12px!important",
							paddingLeft: "6px!important",
							width: "initial!important",
						}}
					>
						{value[screenSize] ? "H" : "V"}
					</Button>
				))}
			</div>

			<CheckboxControl
				updateHandling="by-value"
				label={`${label} - ${screenSizes[selectedSize].label}`}
				value={value[selectedSize] ?? false}
				setValue={(newValue) => {
					const newObject = {...value};
					newObject[selectedSize] = newValue;
					setValue(newObject);
				}}
				defaultValue={defaultValue ? defaultValue[selectedSize] : false}
				{...props}
			/>
		</>
	) : null;
};

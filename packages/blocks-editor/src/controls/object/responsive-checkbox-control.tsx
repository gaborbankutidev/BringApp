import {Button, Icon} from "@wordpress/components";
import cloneDeep from "lodash.clonedeep";
import get from "lodash.get";
import set from "lodash.set";
import type {FC} from "react";
import React, {useState} from "react";
import {CheckboxControl} from "..";
import {ResponsiveValue} from "../../client-types";
import type {ResponsiveLabels} from "../../styles/types";
import {screenSizes} from "../../styles/utils";
import {objectKeys} from "../../utils";
import {useControlContext} from "../context";
import type {ControlByPath, ControlByValue, ControlType} from "../types";
import {isPathControl} from "../utils";

/**
 * A control component that renders a responsive checkbox control.
 *
 * @template pT - The type of the attributes object.
 *
 * @param props - The props for the ResponsiveCheckboxControl component.
 * @returns The rendered ResponsiveCheckboxControl component.
 */
export const ResponsiveCheckboxControl = <pT extends object = {}>(
	props: ControlType<ResponsiveValue<boolean>, pT>,
) =>
	isPathControl(props) ? (
		<ResponsiveCheckboxControlByPath {...props} />
	) : (
		<ResponsiveCheckboxControlByValue {...props} />
	);

/**
 * A control component that renders a responsive checkbox control based on a path.
 *
 * @template pT - The type of the attributes object.
 *
 * @param path - The path to the value in the attributes object.
 * @param updateHandling - The update handling strategy.
 * @param props - The rest of the props for the ResponsiveCheckboxControlByPath component.
 * @returns The rendered ResponsiveCheckboxControlByPath component.
 */
function ResponsiveCheckboxControlByPath<pT extends object>({
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

/**
 * A control component that renders a responsive checkbox control based on a value.
 *
 * @param label - The label for the checkbox input.
 * @param value - The value of the checkbox input.
 * @param setValue - The function to set the value of the checkbox input.
 * @param show - Whether to show the checkbox input.
 * @param updateHandling - The update handling strategy.
 * @param defaultValue - The default value for the checkbox input.
 * @param props - The rest of the props for the ResponsiveCheckboxControlByValue component.
 *
 * @returns The rendered ResponsiveCheckboxControlByValue component.
 */
const ResponsiveCheckboxControlByValue: FC<ControlByValue<ResponsiveValue<boolean>>> = ({
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

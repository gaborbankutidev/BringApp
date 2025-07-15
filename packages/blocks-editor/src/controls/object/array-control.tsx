import { Button, Icon } from "@wordpress/components"
import cloneDeep from "lodash.clonedeep"
import get from "lodash.get"
import set from "lodash.set"
import React, { type FC } from "react"
import { ImageType } from "../../types"
import { defaultImageValue } from "../../utils"
import { useControlContext } from "../context"
import { TextControl } from "../primitive/text-control"
import type {
	ArrayControlByPathType,
	ArrayControlByValueType,
	ArrayControlType,
	ControlByValue,
} from "../types"
import { isArrayPathControl } from "../utils"
import { ImageControl } from "./image-control"

type ArrayControlArgs<vT> = {
	Control: FC<ControlByValue<vT> & { index: number }>
	defaultItem: vT
}

/**
 * ImageArrayControl component.
 * @returns The rendered ImageArrayControl component.
 */
export const ImageArrayControl = makeArrayControl<ImageType>({
	Control: ImageControl,
	defaultItem: defaultImageValue,
})

/**
 * TextArrayControl component.
 * @returns The rendered TextArrayControl component.
 */
export const TextArrayControl = makeArrayControl<string>({
	Control: TextControl,
	defaultItem: "",
})

export function makeArrayControl<vT>(args: ArrayControlArgs<vT>) {
	return function <pT extends object = object>(props: ArrayControlType<vT, pT>) {
		return <ArrayControl {...props} {...args} />
	}
}

const ArrayControl = <vT, pT extends object = object>(
	props: ArrayControlType<vT, pT> & ArrayControlArgs<vT>
) =>
	isArrayPathControl<vT, pT>(props) ? (
		<ArrayControlByPath {...props} />
	) : (
		<ArrayControlByValue {...props} />
	)

function ArrayControlByPath<pT extends object, vT>({
	path,
	updateHandling,
	...props
}: ArrayControlByPathType<pT, vT> & ArrayControlArgs<vT>) {
	const { attributes, setAttributes } = useControlContext()
	const value = get(attributes, path)

	return (
		<ArrayControlByValue
			updateHandling="by-value"
			value={value}
			setValue={(newValue) => {
				const newAttributes = cloneDeep(attributes)
				set(newAttributes, path, newValue)
				setAttributes(newAttributes)
			}}
			{...props}
		/>
	)
}

function ArrayControlByValue<vT>({
	label,
	value = [],
	setValue,
	show = true,
	Control,
	defaultItem,
}: ArrayControlByValueType<vT> & ArrayControlArgs<vT>) {
	return show ? (
		<div className="components-base-control">
			{label && (
				<div
					style={{
						marginBottom: "8px",
						textTransform: "uppercase",
						fontSize: "11px",
						fontWeight: "500",
					}}
					className="components-base-control__label"
				>
					{label}
				</div>
			)}
			{value?.map((item, index) => (
				<div key={index}>
					<Control
						updateHandling="by-value"
						value={item}
						label={`Item #${index + 1}`}
						setValue={(newValue) => {
							const newArray = [...value]
							newArray[index] = newValue ?? defaultItem
							setValue(newArray)
						}}
						setDefault={false}
						defaultValue={defaultItem}
						index={index}
					/>

					<div
						style={{
							display: "flex",
							gap: "8px",
							borderBottom: "1px solid #e0e0e0",
							paddingBottom: "12px",
							marginBottom: "12px",
						}}
					>
						<Button
							variant="secondary"
							icon={<Icon icon="arrow-up-alt" />}
							disabled={index <= 0 ? true : false}
							onClick={() => {
								const newArray = [...value]
								const e = newArray[index > 0 ? index - 1 : index]
								if (e === undefined) {
									return
								}
								newArray[index > 0 ? index - 1 : index] = item
								newArray[index] = e
								setValue(newArray)
							}}
						/>
						<Button
							variant="secondary"
							icon={<Icon icon="arrow-down-alt" />}
							disabled={index >= value.length - 1 ? true : false}
							onClick={() => {
								const newArray = [...value]
								const e = newArray[index < newArray.length - 1 ? index + 1 : index]
								newArray[index < newArray.length - 1 ? index + 1 : index] = item
								if (e === undefined) {
									return
								}
								newArray[index] = e
								setValue(newArray)
							}}
						/>
						<Button
							variant="secondary"
							isDestructive
							icon={<Icon icon="trash" />}
							onClick={() => {
								const newArray = [...value]
								newArray.splice(index, 1)
								setValue(newArray)
							}}
						/>
					</div>
				</div>
			))}

			<Button
				variant="secondary"
				icon={<Icon icon="plus-alt" />}
				onClick={() => {
					const newArray = [...value]
					newArray.push(defaultItem)
					setValue(newArray)
				}}
				style={{ width: "100%" }}
			/>
		</div>
	) : null
}

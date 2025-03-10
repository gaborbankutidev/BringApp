import { Button, Icon } from "@wordpress/components"
import cloneDeep from "lodash.clonedeep"
import get from "lodash.get"
import set from "lodash.set"
import type { FC } from "react"
import React from "react"
import { ImageControl, TextControl } from ".."
import type { ImageType } from "../../types"
import { defaultImageValue } from "../../utils"
import { useControlContext } from "../context"
import type { ArrayControlType, ControlByValue } from "../types"
/**
 * ImageArrayControl component.
 * @returns The rendered ImageArrayControl component.
 */
export const ImageArrayControl = makeArrayControl<ImageType>({
	control: ImageControl,
	defaultItem: defaultImageValue,
})

/**
 * TextArrayControl component.
 * @returns The rendered TextArrayControl component.
 */
export const TextArrayControl = makeArrayControl<string>({
	control: TextControl,
	defaultItem: "",
})

/**
 * A function that creates an array control component.
 *
 * @param args - The arguments for defining an array control component.
 * @returns A function that creates an array control component.
 */
export function makeArrayControl<vT>(args: { control: FC<ControlByValue<vT>>; defaultItem: vT }) {
	return function <pT extends object>(props: ArrayControlType<vT, pT>) {
		if (props.updateHandling === "by-value") {
			const { value, setValue, defaultItem = args.defaultItem, show = true } = props
			return show ? (
				<>
					{value.map((item, index) => (
						<div style={{ paddingBottom: "24px" }}>
							{React.createElement(args.control, {
								updateHandling: "by-value",
								value: item,
								label: "Item #" + index,
								setValue: (newItem: any) => {
									const newArray = [...value]
									newArray[index] = newItem
									setValue(newArray)
								},
								setDefault: false,
							})}

							<div
								style={{
									display: "flex",
									gap: "8px",
									borderBottom: "1px solid #e0e0e0",
									paddingBottom: "16px",
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
				</>
			) : null
		}
		const { path, defaultItem = args.defaultItem, show = true } = props
		const { attributes, setAttributes } = useControlContext()
		const value = get(attributes, path) as vT[]
		const setValue = (newValue: vT[]) => {
			const newAttributes = cloneDeep(attributes)
			set(newAttributes, path, newValue)
			setAttributes(newAttributes)
		}
		return show ? (
			<>
				{value.map((item, index) => (
					<div style={{ paddingBottom: "24px" }}>
						{React.createElement(args.control, {
							updateHandling: "by-value",
							value: item,
							label: "Item #" + index,
							setValue: (newItem: any) => {
								const newArray = [...value]
								newArray[index] = newItem
								setValue(newArray)
							},
							setDefault: false,
						})}

						<div
							style={{
								display: "flex",
								gap: "8px",
								borderBottom: "1px solid #e0e0e0",
								paddingBottom: "16px",
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
			</>
		) : null
	}
}

import React from "react";
import {MediaUpload, MediaUploadCheck} from "@wordpress/block-editor";
import {Button} from "@wordpress/components";
import get from "lodash.get";
import set from "lodash.set";
import cloneDeep from "lodash.clonedeep";
import type {MediaType, Obj} from "../../types";
import type {ControlByPath, ControlByValue, ControlType} from "../types";
import {useControlContext} from "../context";
import {isPathControl} from "../utils";
import {defaultMediaValue} from "../../utils";

type MediaOption = string[];

type MediaControlProps = {
	allowedTypes?: MediaOption;
	Preview?: React.FC<MediaType>;
};

export const MediaControl = <pT extends Obj = {}>(
	props: ControlType<MediaType, pT> & MediaControlProps,
) =>
	isPathControl(props) ? (
		<MediaControlByPath {...props} />
	) : (
		<MediaControlByValue {...props} />
	);

function MediaControlByPath<pT extends Obj>({
	path,
	updateHandling,
	...props
}: ControlByPath<pT, MediaType> & MediaControlProps) {
	const {attributes, setAttributes} = useControlContext();
	const value = get(attributes, path);

	return (
		<MediaControlByValue
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

function MediaControlByValue({
	label,
	value,
	setValue,
	allowedTypes,
	Preview = (value: MediaType) => <p>{value.filename}</p>,
	show = true,
}: ControlByValue<MediaType> & MediaControlProps) {
	return show ? (
		<MediaUploadCheck fallback={null}>
			<MediaUpload
				title={label ?? "Select media"}
				onSelect={(value) => {
					const src = value.url;
					const v = value as MediaType;
					v.src = src;
					setValue(v);
				}}
				allowedTypes={allowedTypes}
				value={value?.id ?? undefined}
				render={({open}) => (
					<div
						style={{
							border: "1px solid #ddd",
							borderRadius: "4px",
							marginBottom: "12px",
							marginTop: "12px",
						}}
					>
						<button
							onClick={open}
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								width: "100%",
								padding: "12px",
							}}
						>
							{value?.id ? <Preview {...value} /> : "No media selected"}
						</button>

						<div
							style={{
								display: "grid",
								gridAutoFlow: "column",
								gap: "12px",
								padding: "12px",
							}}
						>
							<Button variant="primary" onClick={open}>
								Select media
							</Button>

							<Button
								isDestructive
								variant="primary"
								onClick={() => {
									setValue(defaultMediaValue);
								}}
							>
								Delete media
							</Button>
						</div>
					</div>
				)}
			/>
		</MediaUploadCheck>
	) : null;
}

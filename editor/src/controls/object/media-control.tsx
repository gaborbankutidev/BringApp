import {MediaUpload, MediaUploadCheck} from "@wordpress/block-editor";
import {Button} from "@wordpress/components";
import cloneDeep from "lodash.clonedeep";
import get from "lodash.get";
import set from "lodash.set";
import React from "react";
import type {MediaType, Obj} from "../../types";
import {defaultMediaValue} from "../../utils";
import {useControlContext} from "../context";
import type {ControlByPath, ControlByValue, ControlType} from "../types";
import {isPathControl} from "../utils";

type MediaOption = string[];

/**
 * Props for the MediaControl component.
 * @property allowedTypes - The allowed media types.
 * @property Preview - The preview component for the media.
 */
type MediaControlProps = {
	allowedTypes?: MediaOption;
	Preview?: React.FC<MediaType>;
};

/**
 * A control component that renders a media upload component.
 *
 * @template pT - The type of the attributes object.
 *
 * @param props - The props for the MediaControl component.
 * @returns The rendered MediaControl component.
 */
export const MediaControl = <pT extends Obj = {}>(
	props: ControlType<MediaType, pT> & MediaControlProps,
) =>
	isPathControl(props) ? (
		<MediaControlByPath {...props} />
	) : (
		<MediaControlByValue {...props} />
	);

/**
 *  A control component that renders a media upload component based on a path.
 *
 * @template pT - The type of the attributes object.
 *
 * @param path - The path to the value in the attributes object.
 * @param updateHandling - The update handling strategy.
 * @param props - The rest of the props for the MediaControlByPath component.
 * @returns The rendered MediaControlByPath component.
 */
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

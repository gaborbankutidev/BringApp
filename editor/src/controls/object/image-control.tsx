import React from "react";
import type {FC} from "react";
import {MediaUpload, MediaUploadCheck} from "@wordpress/block-editor";
import {Button} from "@wordpress/components";
import get from "lodash.get";
import set from "lodash.set";
import cloneDeep from "lodash.clonedeep";
import type {ImageType, Obj} from "../../types";
import {defaultImageValue} from "../../utils";
import type {ControlByPath, ControlByValue, ControlType} from "../types";
import {useControlContext} from "../context";
import {isPathControl} from "../utils";

export const ImageControl = <pT extends Obj = {}>(
	props: ControlType<ImageType, pT>,
) =>
	isPathControl(props) ? (
		<ImageControlByPath {...props} />
	) : (
		<ImageControlByValue {...props} />
	);

function ImageControlByPath<pT extends Obj>({
	path,
	updateHandling,
	...props
}: ControlByPath<pT, ImageType>) {
	const {attributes, setAttributes} = useControlContext();
	const value = get(attributes, path);

	return (
		<ImageControlByValue
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

const ImageControlByValue: FC<ControlByValue<ImageType>> = ({
	label,
	value = defaultImageValue,
	setValue,
	show = true,
}) =>
	show ? (
		<MediaUploadCheck
			fallback={
				<div>You don't have permission to access the media library</div>
			}
		>
			<MediaUpload
				title={label ?? "Select image"}
				onSelect={(value) => {
					setValue({
						src: value["url"] ?? "",
						alt: value["alt"] ?? "",
						id: value.id ?? null,
					});
				}}
				allowedTypes={["image"]}
				value={value?.id ?? undefined}
				render={({open}) => (
					<>
						<Button
							className={
								!value.src
									? "editor-post-featured-image__toggle"
									: "editor-post-featured-image__preview"
							}
							onClick={open}
						>
							{value.src ? (
								<div>
									<img src={value.src} alt={value.alt ?? ""} />
								</div>
							) : (
								<p>Select image</p>
							)}
						</Button>
						<div
							style={{
								display: "grid",
								gridAutoFlow: "column",
								gap: "12px",
								padding: "12px",
							}}
						>
							<Button variant="link" onClick={open}>
								Select image
							</Button>

							<Button
								isDestructive
								variant="link"
								onClick={() => {
									setValue({id: null, src: "", alt: ""});
								}}
							>
								Delete image
							</Button>
						</div>
					</>
				)}
			/>
		</MediaUploadCheck>
	) : null;

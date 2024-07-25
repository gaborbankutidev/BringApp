import React from "react";
import {InnerBlocks, InspectorAdvancedControls} from "@wordpress/block-editor";
import {EditorCard} from "../components";
import type {Obj} from "../types";
import type {Attributes, BlockConfig} from "./types";
import {makeControls} from "./make-controls";
import {ControlContextProvider} from "../controls/context";
import {makeBringStylesClassNames} from "../styles";
import {twJoin} from "tailwind-merge";
import {TextControl} from "../controls";
import {makeBringStylesControl} from "../styles";

type EditType<Props> = {
	attributes: Attributes<Props>;
	setAttributes: (attributes: Partial<Attributes<Props>>) => void;
	isSelected?: boolean;
	clientId: string;
};

export function makeEdit<Props extends Obj>(config: BlockConfig<Props>) {
	return ({attributes, setAttributes, clientId, isSelected}: EditType<Props>) => {
		const {key, parentKey, className, id, bringStyles, ...props} = attributes;

		// set key on load
		if (key !== clientId) {
			setAttributes({key: clientId} as Partial<Attributes<Props>>);
		}

		// set parentKey on load
		const editorParentKeys = window.wp.data.select("core/block-editor").getBlockParents(clientId);
		const editorParentKey = editorParentKeys.length
			? editorParentKeys[editorParentKeys.length - 1]
			: "";
		if (parentKey !== editorParentKey) {
			setAttributes({parentKey: editorParentKey} as Partial<Attributes<Props>>);
		}

		// calculate bring styles class names
		const joinedClassName = config.styles
			? twJoin(makeBringStylesClassNames(config.styles, bringStyles).classNames, className)
			: className;

		return (
			<ControlContextProvider attributes={attributes} setAttributes={setAttributes}>
				<InspectorAdvancedControls>
					<TextControl
						updateHandling="by-value"
						label="Id"
						value={attributes.id}
						setValue={(newValue) => {
							setAttributes({id: newValue} as Partial<Attributes<Props>>);
						}}
					/>
				</InspectorAdvancedControls>
				{config.Controls && makeControls<Props>(attributes, setAttributes, config.Controls)}
				{config.styles && makeBringStylesControl(config.styles)}

				{config.Edit ? (
					<config.Edit
						attributes={attributes}
						setAttributes={setAttributes}
						clientId={clientId}
						isSelected={isSelected ?? false}
					>
						<InnerBlocks allowedBlocks={config.allowedBlocks} />
					</config.Edit>
				) : (
					<EditorCard color="grey" isSelected={isSelected ?? false} name={config.componentName}>
						<config.Component className={joinedClassName} id={id} {...(props as any)}>
							<InnerBlocks allowedBlocks={config.allowedBlocks} />
						</config.Component>
					</EditorCard>
				)}
			</ControlContextProvider>
		);
	};
}
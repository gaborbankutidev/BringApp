import {InnerBlocks, InspectorAdvancedControls} from "@wordpress/block-editor";
import React from "react";
import {twJoin} from "tailwind-merge";
import {EditorCard} from "../components";
import {TextControl} from "../controls";
import {ControlContextProvider} from "../controls/context";
import {makeBlockStylesClassNames, makeBlockStylesControl} from "../styles";
import type {Obj} from "../types";
import {makeControls} from "./make-controls";
import type {Attributes, BlockConfig} from "./types";

type EditType<Props> = {
	attributes: Attributes<Props>;
	setAttributes: (attributes: Partial<Attributes<Props>>) => void;
	isSelected?: boolean;
	clientId: string;
};

export function makeEdit<Props extends Obj>(config: BlockConfig<Props>) {
	// eslint-disable-next-line react/display-name
	return ({attributes, setAttributes, clientId, isSelected}: EditType<Props>) => {
		const {className, blockStyles, ...props} = attributes;

		// calculate bring styles class names
		const joinedClassName = config.blockStyles
			? twJoin(
					makeBlockStylesClassNames(config.blockStyles, blockStyles).classNames,
					className,
				)
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
				{config.blockStyles && makeBlockStylesControl(config.blockStyles)}

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
					<EditorCard
						color="grey"
						isSelected={isSelected ?? false}
						name={config.title ?? config.blockName}
					>
						{/* eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
						<config.Block attributes={{className: joinedClassName, ...props}}>
							<InnerBlocks allowedBlocks={config.allowedBlocks} />
						</config.Block>
					</EditorCard>
				)}
			</ControlContextProvider>
		);
	};
}

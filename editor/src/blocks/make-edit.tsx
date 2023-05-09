import React from "react";
import {InnerBlocks} from "@wordpress/block-editor";
import {EditorCard} from "../components";
import {BringContextProvider} from "@bring/blocks-client";
import type {Obj} from "../types";
import type {BlockConfig, BlockKeys, BlockEdit} from "./types";
import {makeControls} from "./make-controls";
import {ControlContextProvider} from "../controls/context";

export function makeEdit<Props extends Obj>(config: BlockConfig<Props>) {
	return ({
		attributes,
		setAttributes,
		clientId,
		isSelected,
	}: BlockEdit<Props>) => {
		// set key on load
		if (attributes.key !== clientId) {
			setAttributes({key: clientId} as Partial<Props & BlockKeys>);
		}

		// set parentKey on load
		const parentKeys = window.wp.data
			.select("core/block-editor")
			.getBlockParents(clientId);
		const parentKey = parentKeys.length
			? (parentKeys[parentKeys.length - 1] as string)
			: "";
		if (attributes.parentKey !== parentKey) {
			setAttributes({parentKey} as Partial<Props & BlockKeys>);
		}

		return (
			<BringContextProvider>
				<ControlContextProvider
					attributes={attributes}
					setAttributes={setAttributes}
				>
					{config.Controls &&
						makeControls<Props>(attributes, setAttributes, config.Controls)}
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
							name={config.componentName}
						>
							<config.Component {...attributes}>
								<InnerBlocks allowedBlocks={config.allowedBlocks} />
							</config.Component>
						</EditorCard>
					)}
				</ControlContextProvider>
			</BringContextProvider>
		);
	};
}

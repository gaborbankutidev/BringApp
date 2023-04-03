import React from "react";
import {InnerBlocks} from "@wordpress/block-editor";
import {bringStoreBlockNode} from "../editor";
import type {Obj} from "../types";
import type {BlockConfig, BlockSave} from "./types";

export function makeSave<Props extends Obj>(config: BlockConfig<Props>) {
	return ({attributes}: BlockSave<Props>) => {
		const {key, parentKey, ...props} = attributes;

		bringStoreBlockNode(parentKey, {
			key,
			component: config.componentName,
			props,
		});

		return <InnerBlocks.Content />;
	};
}

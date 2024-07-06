import React from "react";
import {InnerBlocks} from "@wordpress/block-editor";
import {bringStoreBlockNode} from "../editor";
import type {Obj} from "../types";
import type {BlockConfig, Attributes} from "./types";
import {makeBringStylesClassNames} from "../styles";

export function makeSave<Props extends Obj>(config: BlockConfig<Props>) {
	return ({attributes}: {attributes: Attributes<Props>}) => {
		const {key, parentKey, bringStyles, ...props} = attributes;
		const bringStylesClassNames = config.styles
			? makeBringStylesClassNames(config.styles, bringStyles)
			: {};

		// TODO use editor hooks instead
		bringStoreBlockNode(parentKey, {
			key,
			component: config.componentName,
			props: {bringStylesClassNames, ...props},
		});

		return <InnerBlocks.Content />;
	};
}

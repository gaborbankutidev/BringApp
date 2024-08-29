import {InnerBlocks} from "@wordpress/block-editor";
import React from "react";
import {makeBringStylesClassNames} from "../styles";
import type {Obj} from "../types";
import type {Attributes, BlockConfig} from "./types";

export function makeSave<Props extends Obj>(config: BlockConfig<Props>) {
	// eslint-disable-next-line react/display-name
	return ({attributes}: {attributes: Attributes<Props>}) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const {key, parentKey, bringStyles, ...props} = attributes;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const bringStylesClassNames = config.styles
			? makeBringStylesClassNames(config.styles, bringStyles)
			: {};

		// TODO send bringstyleclassnames to editor

		// TODO use editor hooks instead
		/*bringStoreBlockNode(parentKey, {
			key,
			component: config.componentName,
			props: {bringStylesClassNames, ...props},
		});*/

		return <InnerBlocks.Content />;
	};
}

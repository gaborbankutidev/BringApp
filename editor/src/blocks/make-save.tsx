import React from "react";
import {InnerBlocks} from "@wordpress/block-editor";
import {twJoin} from "tailwind-merge";
import {bringStoreBlockNode} from "../editor";
import type {Obj} from "../types";
import type {BlockConfig, Attributes} from "./types";
import {makeBringStylesClassNames} from "../styles";

export function makeSave<Props extends Obj>(config: BlockConfig<Props>) {
	return ({attributes}: {attributes: Attributes<Props>}) => {
		const {key, parentKey, bringStyles, className, ...props} = attributes;
		const joinedClassName = config.styles
			? twJoin(makeBringStylesClassNames(config.styles, bringStyles), className)
			: className;

		// TODO use editor hooks instead
		bringStoreBlockNode(parentKey, {
			key,
			component: config.componentName,
			props: {className: joinedClassName, ...props},
		});

		return <InnerBlocks.Content />;
	};
}

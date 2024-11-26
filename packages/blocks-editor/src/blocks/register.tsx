import {registerBlockType} from "@wordpress/blocks";
import {blockStylesDefaultValue} from "../styles/utils";
import type {Obj} from "../types";
import {objectAttributeSource, stringAttributeSource} from "./attributes";
import {makeEdit} from "./make-edit";
import {makeSave} from "./make-save";
import type {BlockConfig} from "./types";

/**
 * Method to register a block.
 * @param config - the configuration of the block
 * @returns void
 */
export function registerBringBlock<Props extends Obj>(config: BlockConfig<Props>) {
	const title = config.title ? config.title : config.blockName;

	// @ts-expect-error: Expect error here because Wordpress's `registerBlockType` types are so complicated TS can't infer the correct types
	registerBlockType(config.componentName, {
		title,
		description: config.description ?? `${title} block by Bring`,
		category: "widgets", // todo custom category
		icon: config.icon ?? "block-default",
		supports: {
			html: false,
		},
		attributes: {
			...config.attributes,
			id: stringAttributeSource(),
			blockStyles: objectAttributeSource(blockStylesDefaultValue),
		},
		example: config.previewAttributes && {
			attributes: config.previewAttributes,
		},
		edit: makeEdit<Props>(config),
		save: makeSave(),
	});
}

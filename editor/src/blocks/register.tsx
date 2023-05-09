import {registerBlockType} from "@wordpress/blocks";
import type {Obj} from "../types";
import {objectAttributeSource} from "./attributes";
import {makeEdit} from "./make-edit";
import {makeSave} from "./make-save";
import type {BlockConfig} from "./types";
import {BringStylesDefaultValue} from "../styles/utils";

export function registerBringBlock<Props extends Obj>(
	config: BlockConfig<Props>,
) {
	const title = config.title ? config.title : config.componentName;

	// @ts-expect-error: Expect error here because Wordpress's `registerBlockType` types are so complicated TS can't infer the correct types
	registerBlockType(`bring/${title.toLowerCase()}`, {
		title,
		description: config.description ?? `${config.title} block by Bring`,
		category: "widgets", // todo custom category
		icon: config.icon ?? "block-default",
		supports: {
			html: false,
		},
		attributes: {
			...config.attributes,
			bringStyles: objectAttributeSource(BringStylesDefaultValue),
			// todo add id
		},
		edit: makeEdit(config),
		save: makeSave(config), // refactor save hooks and use InnedBlock instead
	});
}

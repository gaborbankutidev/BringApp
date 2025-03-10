import { InnerBlocks } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"
import React from "react"
import { blockStylesDefaultValue } from "../styles/utils"
import { objectAttributeSource, stringAttributeSource } from "./attributes"
import { makeEdit } from "./make-edit"
import type { BlockConfig } from "./types"

/**
 * Method to register a block.
 * @param config - the configuration of the block
 * @returns void
 */
export function registerBringBlock(config: BlockConfig) {
	const title = config.title ? config.title : config.blockName

	// @ts-expect-error: Expect error here because Wordpress's `registerBlockType` types are so complicated TS can't infer the correct types
	registerBlockType(config.blockName, {
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
		edit: makeEdit(config),
		// @ts-ignore
		save: () => <InnerBlocks.Content />,
	})
}

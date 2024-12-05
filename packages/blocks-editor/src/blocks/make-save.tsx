import { InnerBlocks } from "@wordpress/block-editor"
import React from "react"

export function makeSave() {
	// eslint-disable-next-line react/display-name
	return () => <InnerBlocks.Content />
}

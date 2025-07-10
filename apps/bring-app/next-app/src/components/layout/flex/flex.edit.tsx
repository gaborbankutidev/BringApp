import { cn } from "@/lib/utils"
import { makeResponsiveClassNames } from "@bring/blocks-client/styles"
import type { BlockEdit } from "@bring/blocks-editor/blocks"
import { EditorCard } from "@bring/blocks-editor/components"
import { useEffect } from "react"
import { type FlexBlockProps } from "./flex.block"

export const FlexEdit: BlockEdit<FlexBlockProps> = ({
	blockProps: { attributes, ...restOfBlockProps },
	Block,
	isSelected = false,
	clientId,
}) => {
	const {
		colSpan,
		rowSpan,
		gap = {},
		direction = {},
		justify = {},
		align = {},
		containerClassName,
		...restOfAttributes
	} = attributes

	useEffect(() => {
		// set block wrapper colspan & rowspan
		const block = clientId ? document.getElementById("block-" + clientId) : null
		if (block) {
			block.setAttribute(
				"style",
				"grid-column: span " + (colSpan?.lg ?? colSpan?.md ?? colSpan?.[""] ?? 1)
			)
		}
		if (block && (rowSpan?.lg ?? rowSpan?.md ?? rowSpan?.[""])) {
			block.setAttribute("style", "grid-row: span " + (rowSpan?.lg ?? rowSpan?.md ?? rowSpan?.[""]))
		}

		if (block) {
			const list = block.querySelector(".block-editor-block-list__layout")
			if (list) {
				list.className = cn(
					"block-editor-block-list__layout",
					"relative flex h-full",
					makeResponsiveClassNames("gap", gap, { "": 4 }),
					makeResponsiveClassNames("flex", direction, { "": "col" }),
					makeResponsiveClassNames("justify", justify),
					makeResponsiveClassNames("items", align),
					containerClassName
				)
			}
		}
	}, [clientId, colSpan, rowSpan, gap, direction, justify, align, containerClassName])

	return (
		<EditorCard color="orange" isSelected={isSelected} name="Flex (Group)">
			<Block attributes={restOfAttributes} {...restOfBlockProps} />
		</EditorCard>
	)
}

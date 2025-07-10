import { cn } from "@/lib/utils"
import { makeResponsiveClassNames } from "@bring/blocks-client/styles"
import type { BlockEdit } from "@bring/blocks-editor/blocks"
import { EditorCard } from "@bring/blocks-editor/components"
import { useEffect } from "react"
import { type GridBlockProps } from "./grid.block"

export const GridEdit: BlockEdit<GridBlockProps> = ({
	blockProps: { attributes, children, ...restOfBlockProps },
	Block,
	isSelected = false,
	clientId,
}) => {
	const { columnCount = {}, gap = {}, containerClassName, ...restOfAttributes } = attributes

	useEffect(() => {
		const block = clientId ? document.getElementById("block-" + clientId) : null

		if (block) {
			const list = block.querySelector(".block-editor-block-list__layout")
			if (list) {
				list.className = cn(
					"block-editor-block-list__layout",
					"grid",
					makeResponsiveClassNames("grid-cols", columnCount, { "": 1, lg: 2 }),
					makeResponsiveClassNames("gap", gap, { "": 8 }),
					containerClassName
				)
			}
		}
	}, [clientId, columnCount, gap, containerClassName])

	return (
		<EditorCard color="green" isSelected={isSelected} name="Grid">
			<Block
				attributes={{ columnCount: { "": 1, md: 1, lg: 1 }, ...restOfAttributes }}
				{...restOfBlockProps}
			>
				{children}
			</Block>
		</EditorCard>
	)
}

import type { BlockEdit } from "@bring/blocks-editor/blocks"
import { EditorCard } from "@bring/blocks-editor/components"
import { type SplitBlockProps } from "./split.block"

export const SplitEdit: BlockEdit<SplitBlockProps> = ({
	blockProps: { attributes, children, ...restOfBlockProps },
	Block,
	isSelected = false,
}) => {
	const { columnCount, ...restOfAttributes } = attributes
	return (
		<EditorCard color="lime" isSelected={isSelected} name="Split">
			<Block attributes={{ columnCount: { "": 1 }, ...restOfAttributes }} {...restOfBlockProps}>
				<div
					className={`editor-row-content editor-row-content-${
						columnCount?.lg ?? columnCount?.md ?? columnCount?.[""] ?? 1
					}`}
				>
					{children}
				</div>
			</Block>
		</EditorCard>
	)
}

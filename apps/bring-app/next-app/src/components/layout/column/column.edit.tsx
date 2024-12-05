
import type {BlockEdit} from "@bring/blocks-editor/blocks";
import {EditorCard} from "@bring/blocks-editor/components";
import {type ColumnBlockProps} from "./column.block";

export const ColumnEdit: BlockEdit<ColumnBlockProps> = ({
	blockProps: {attributes, ...restOfBlockProps},
	Block,
	isSelected = false,
	clientId,
}) => {
	const {colSpan, rowSpan, ...restOfAttributes} = attributes;

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

	return (
		<EditorCard color="orange" isSelected={isSelected} name="Column">
			<Block attributes={restOfAttributes} {...restOfBlockProps} />
		</EditorCard>
	)
}

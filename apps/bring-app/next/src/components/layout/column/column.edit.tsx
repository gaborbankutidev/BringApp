import type {BlockEdit} from "@bring/blocks-editor";
import {EditorCard} from "@bring/blocks-editor";
import {column, type ColumnBlockProps} from "./column.block";

export const ColumnEdit: BlockEdit<ColumnBlockProps> = ({
	children,
	attributes,
	isSelected = false,
	clientId,
}) => {
	const {colSpan, rowSpan, ...props} = attributes;

	// set block wrapper colspan & rowspan
	const block = clientId ? document.getElementById("block-" + clientId) : null;
	block &&
		block.setAttribute(
			"style",
			"grid-column: span " + (colSpan?.lg ?? colSpan?.md ?? colSpan?.[""] ?? 1),
		);
	block &&
		(rowSpan?.lg ?? rowSpan?.md ?? rowSpan?.[""]) &&
		block.setAttribute(
			"style",
			"grid-row: span " + (rowSpan?.lg ?? rowSpan?.md ?? rowSpan?.[""]),
		);

	return (
		<EditorCard color="orange" isSelected={isSelected} name="Column">
			<column.Component {...props}>{children}</column.Component>
		</EditorCard>
	);
};

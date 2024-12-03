import type {BlockEdit} from "@bring/blocks-editor/blocks";
import {EditorCard} from "@bring/blocks-editor/components";
import {type RowBlockProps} from "./row.block";

export const RowEdit: BlockEdit<RowBlockProps> = ({
	blockProps: {attributes, children, ...restOfBlockProps},
	Block,
	isSelected = false,
}) => {
	const {columnCount, ...restOfAttributes} = attributes;
	return (
		<EditorCard color="green" isSelected={isSelected} name="Row">
			<Block attributes={restOfAttributes} {...restOfBlockProps}>
				<div
					className={`editor-row-content editor-row-content-${
						columnCount?.lg ?? columnCount?.md ?? columnCount?.[""] ?? 1
					}`}
				>
					{children}
				</div>
			</Block>
		</EditorCard>
	);
};

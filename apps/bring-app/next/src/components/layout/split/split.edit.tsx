import type {BlockEdit} from "@bring/blocks-editor";
import {EditorCard} from "@bring/blocks-editor";
import SplitBlock, {type SplitBlockProps} from "./split.block";

export const SplitEdit: BlockEdit<SplitBlockProps> = ({
	children,
	attributes,
	isSelected = false,
}) => {
	const {columnCount, ...props} = attributes;
	return (
		<EditorCard color="lime" isSelected={isSelected} name="Split">
			<SplitBlock {...props} columnCount={{"": 1}}>
				<div
					className={`editor-row-content editor-row-content-${
						columnCount?.lg ?? columnCount?.md ?? columnCount?.[""] ?? 1
					}`}
				>
					{children}
				</div>
			</SplitBlock>
		</EditorCard>
	);
};

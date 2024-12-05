import { default as Split, type SplitProps } from "@/components/layout/split"
import type { BlockEdit } from "@bring/blocks-editor"
import { EditorCard } from "@bring/blocks-editor"

export const SplitEdit: BlockEdit<SplitProps> = ({ children, attributes, isSelected = false }) => {
	const { columnCount, ...props } = attributes
	return (
		<EditorCard color="lime" isSelected={isSelected} name="Split">
			<Split {...props} columnCount={{ "": 1 }}>
				<div
					className={`editor-row-content editor-row-content-${
						columnCount?.lg ?? columnCount?.md ?? columnCount?.[""] ?? 1
					}`}
				>
					{children}
				</div>
			</Split>
		</EditorCard>
	)
}

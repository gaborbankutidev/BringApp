import { row, type RowBlockProps as RowProps } from "@/components/layout/row"
import type { BlockEdit } from "@bring/blocks-editor"
import { EditorCard } from "@bring/blocks-editor"

export const RowEdit: BlockEdit<RowProps> = ({ children, attributes, isSelected = false }) => {
	const { columnCount, ...props } = attributes
	return (
		<EditorCard color="green" isSelected={isSelected} name="Row">
			<row.Component {...props}>
				<div
					className={`editor-row-content editor-row-content-${
						columnCount?.lg ?? columnCount?.md ?? columnCount?.[""] ?? 1
					}`}
				>
					{children}
				</div>
			</row.Component>
		</EditorCard>
	)
}

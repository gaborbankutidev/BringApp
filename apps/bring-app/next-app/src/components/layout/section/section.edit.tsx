import type { BlockEdit } from "@bring/blocks-editor/blocks"
import { EditorCard } from "@bring/blocks-editor/components"
import { type SectionBlockProps } from "./section.block"

export const SectionEdit: BlockEdit<SectionBlockProps> = ({
	blockProps,
	Block,
	isSelected = false,
}) => {
	return (
		<EditorCard color="blue" isSelected={isSelected} name="Section">
			<Block {...blockProps} />
		</EditorCard>
	)
}

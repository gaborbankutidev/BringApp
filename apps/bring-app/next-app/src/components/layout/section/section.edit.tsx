import { section, type SectionBlockProps as SectionProps } from "@/components/layout/section"
import type { BlockEdit } from "@bring/blocks-editor"
import { EditorCard } from "@bring/blocks-editor"

export const SectionEdit: BlockEdit<SectionProps> = ({
	children,
	isSelected = false,
	...props
}) => {
	return (
		<EditorCard color="blue" isSelected={isSelected} name="Section">
			<section.Component {...props}>{children}</section.Component>
		</EditorCard>
	)
}

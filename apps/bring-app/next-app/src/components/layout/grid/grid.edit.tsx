import { cn } from "@/lib/utils"
import { makeResponsiveClassNames } from "@bring/blocks-client"
import type { BlockEdit } from "@bring/blocks-editor/blocks"
import { EditorCard } from "@bring/blocks-editor/components"
import { type GridBlockProps } from "./grid.block"

export const GridEdit: BlockEdit<GridBlockProps> = ({
	blockProps: { attributes, children, ...restOfBlockProps },
	Block,
	isSelected = false,
}) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { columnCount = {}, gap = {}, containerClassName, ...restOfAttributes } = attributes

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

export const gridEditContainerClassName = ({
	columnCount = {},
	gap = {},
	containerClassName,
}: GridBlockProps) =>
	cn(
		"grid",
		makeResponsiveClassNames("grid-cols", columnCount, { "": 1, lg: 2 }),
		makeResponsiveClassNames("gap", gap, { "": 8 }),
		containerClassName
	)

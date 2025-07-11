import { cn } from "@/lib/utils"
import { makeResponsiveClassNames } from "@bring/blocks-client/styles"
import type { BlockEdit } from "@bring/blocks-editor/blocks"
import { EditorCard } from "@bring/blocks-editor/components"
import { type FlexBlockProps } from "./flex.block"

export const FlexEdit: BlockEdit<FlexBlockProps> = ({
	blockProps: { attributes, ...restOfBlockProps },
	Block,
	isSelected = false,
}) => {
	const {
		colSpan, // eslint-disable-line @typescript-eslint/no-unused-vars
		rowSpan, // eslint-disable-line @typescript-eslint/no-unused-vars
		gap, // eslint-disable-line @typescript-eslint/no-unused-vars
		direction, // eslint-disable-line @typescript-eslint/no-unused-vars
		justify, // eslint-disable-line @typescript-eslint/no-unused-vars
		align, // eslint-disable-line @typescript-eslint/no-unused-vars
		containerClassName, // eslint-disable-line @typescript-eslint/no-unused-vars
		...restOfAttributes
	} = attributes

	return (
		<EditorCard color="orange" isSelected={isSelected} name="Flex (Group)">
			<Block attributes={restOfAttributes} {...restOfBlockProps} />
		</EditorCard>
	)
}

export const flexEditWrapperClassName = ({ colSpan = {}, rowSpan = {} }: FlexBlockProps) =>
	cn(
		makeResponsiveClassNames("col-span", colSpan, { "": 1 }),
		makeResponsiveClassNames("row-span", rowSpan)
	)

export const flexEditContainerClassName = ({
	gap = {},
	direction = {},
	justify = {},
	align = {},
	containerClassName,
}: FlexBlockProps) =>
	cn(
		"relative flex h-full",
		makeResponsiveClassNames("gap", gap, { "": 4 }),
		makeResponsiveClassNames("flex", direction, { "": "col" }),
		makeResponsiveClassNames("justify", justify),
		makeResponsiveClassNames("items", align),
		containerClassName
	)

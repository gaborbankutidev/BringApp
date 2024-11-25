import type {BlockEdit} from "@bring/blocks-editor";
import {EditorCard} from "@bring/blocks-editor";
import {section, type SectionBlockProps} from "./section.block";

export const SectionEdit: BlockEdit<SectionBlockProps> = ({
	children,
	isSelected = false,
	attributes: props,
}) => {
	return (
		<EditorCard color="blue" isSelected={isSelected} name="Section">
			<section.Component {...props}>{children}</section.Component>
		</EditorCard>
	);
};

import {EditorCard, type BlockEdit} from "@bring/blocks-editor";
import {group, type GroupBlockProps} from "./group.block";

const GroupEdit: BlockEdit<GroupBlockProps> = ({children, attributes, isSelected = false}) => {
	const {...props} = attributes;

	return (
		<EditorCard color="lime" name="Group" isSelected={isSelected}>
			<group.Component {...props}>{children}</group.Component>
		</EditorCard>
	);
};

export default GroupEdit;

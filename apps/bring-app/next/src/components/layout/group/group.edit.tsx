import {EditorCard, type BlockEdit} from "@bring/blocks-editor";
import {group, type GroupBlockProps} from "./group.block";

const GroupEdit: BlockEdit<GroupBlockProps> = ({children, attributes, isSelected = false}) => {
	const {...props} = attributes;

	return (
		<EditorCard color="lime" name="Group" isSelected={isSelected}>
			<group.Block {...props}>{children}</group.Block>
		</EditorCard>
	);
};

export default GroupEdit;

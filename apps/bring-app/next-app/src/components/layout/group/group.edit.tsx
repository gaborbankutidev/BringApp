import {group, type GroupProps} from "@/components/layout/group";
import {EditorCard, type BlockEdit} from "@bring/blocks-editor";

const GroupEdit: BlockEdit<GroupProps> = ({
	children,
	attributes,
	isSelected = false,
}) => {
	const {...props} = attributes;

	return (
		<EditorCard color="lime" name="Group" isSelected={isSelected}>
			<group.Component {...props}>{children}</group.Component>
		</EditorCard>
	);
};

export default GroupEdit;

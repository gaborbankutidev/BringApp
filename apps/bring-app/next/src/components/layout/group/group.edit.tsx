import {type BlockEdit} from "@bring/blocks-editor/blocks";
import {EditorCard} from "@bring/blocks-editor/components";
import {type GroupBlockProps} from "./group.block";

const GroupEdit: BlockEdit<GroupBlockProps> = ({
	blockProps,
	Block,
	isSelected = false,
}) => {
	return (
		<EditorCard color="amber" name="Group" isSelected={isSelected}>
			<Block {...blockProps} />
		</EditorCard>
	);
};

export default GroupEdit;

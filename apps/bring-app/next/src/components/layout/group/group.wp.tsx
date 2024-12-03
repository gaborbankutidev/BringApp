import {alignOptions, colorOptions, directionOptions, justifyOptions} from "@/editor/utils/options";
import {
	objectAttributeSource,
	stringAttributeSource,
	type BlockConfig,
} from "@bring/blocks-editor/blocks";
import {group, type GroupBlockProps} from "./group.block";
import GroupControls from "./group.controls";
import GroupEdit from "./group.edit";

const groupConfig: BlockConfig<GroupBlockProps> = {
	...group,
	title: "Group",
	description: "A group of blocks, can be vertical or horizontal.",
	icon: "align-center",
	attributes: {
		gap: objectAttributeSource(),
		direction: stringAttributeSource(),
		justify: stringAttributeSource(),
		align: stringAttributeSource(),
		backgroundColor: stringAttributeSource(),
	},
	Edit: GroupEdit,
	Controls: [
		{
			panel: "Settings",
			controls: [
				GroupControls,
				{
					type: "select",
					path: "direction",
					label: "Direction",
					options: directionOptions,
				},
				{
					type: "select",
					path: "justify",
					label: "Justify",
					options: justifyOptions,
				},
				{
					type: "select",
					path: "align",
					label: "Align",
					options: alignOptions,
				},
				{
					type: "select",
					path: "backgroundColor",
					label: "Background color",
					options: colorOptions,
				},
			],
			initialOpen: true,
		},
	],
};

export default groupConfig;

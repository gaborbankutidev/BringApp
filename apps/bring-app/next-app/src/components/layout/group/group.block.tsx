import { group, type GroupProps } from "@/components/layout/group"
import {
	alignOptions,
	colorOptions,
	directionOptions,
	justifyOptions,
} from "@/editor/utils/options"
import {
	objectAttributeSource,
	stringAttributeSource,
	type BlockConfig,
} from "@bring/blocks-editor"
import GroupControls from "./group.controls"
import GroupEdit from "./group.edit"

const groupConfig: BlockConfig<GroupProps> = {
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
	styles: {
		spacing: {
			m: {
				t: {},
				b: {},
				l: {},
				r: {},
			},
			p: {
				t: {},
				b: {},
				l: {},
				r: {},
			},
		},
		visibility: { "": "flex", md: "flex", lg: "flex" },
	},
}

export default groupConfig

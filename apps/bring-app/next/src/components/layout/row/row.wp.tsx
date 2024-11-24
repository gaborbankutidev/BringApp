import type {BlockConfig} from "@bring/blocks-editor";
import {makeOptions, objectAttributeSource, stringAttributeSource} from "@bring/blocks-editor";
import {sizes} from "./row";
import {row, type RowBlockProps} from "./row.block";
import {RowControls} from "./row.controls";
import {RowEdit} from "./row.edit";

import {colorOptions} from "@/editor/utils/options";
import {objectKeys} from "@bring/blocks-client";

const rowConfig: BlockConfig<RowBlockProps> = {
	...row,
	title: "Row",
	icon: "align-center",
	allowedBlocks: ["bring/column"],
	attributes: {
		columnCount: objectAttributeSource(),
		gap: objectAttributeSource(),
		backgroundColor: stringAttributeSource(),
		size: stringAttributeSource(),
	},
	Edit: RowEdit,
	Controls: [
		{panel: "Grid settings", controls: [RowControls], initialOpen: true},
		{
			panel: "Row settings",
			controls: [
				{
					type: "select",
					label: "Size",
					path: "size",
					options: makeOptions(objectKeys(sizes)),
				},
				{
					type: "select",
					label: "Background color",
					path: "backgroundColor",
					options: colorOptions,
				},
			],
		},
	],
	styles: {
		spacing: {
			m: {
				t: {"": 0},
				b: {"": 0},
				l: {},
				r: {},
			},
			p: {
				t: {"": 6},
				b: {"": 6},
				l: {},
				r: {},
			},
		},
		visibility: {"": "grid", md: "grid", lg: "grid"},
	},
};

export default rowConfig;

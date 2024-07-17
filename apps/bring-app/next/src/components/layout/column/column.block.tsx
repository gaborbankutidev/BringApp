import {column, type ColumnBlockProps} from "@/components/layout/column";
import {
	alignOptions,
	colorOptions,
	directionOptions,
	justifyOptions,
} from "@/editor/utils/options";
import {
	objectAttributeSource,
	stringAttributeSource,
	type BlockConfig,
} from "@bring/blocks-editor";
import {ColumnControls} from "./column.controls";
import {ColumnEdit} from "./column.edit";

export const columnConfig: BlockConfig<ColumnBlockProps> = {
	...column,
	icon: "align-center",
	attributes: {
		colSpan: objectAttributeSource(),
		rowSpan: objectAttributeSource(),
		gap: objectAttributeSource(),
		direction: stringAttributeSource(),
		justify: stringAttributeSource(),
		align: stringAttributeSource(),
		backgroundColor: stringAttributeSource(),
	},
	Edit: ColumnEdit,
	Controls: [
		{panel: "Grid settings", controls: [ColumnControls], initialOpen: true},
		{
			panel: "Column setting",
			controls: [
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
					label: "ALign",
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
				t: {"": 0},
				b: {"": 0},
				l: {},
				r: {},
			},
			p: {
				t: {"": 0},
				b: {"": 0},
				l: {},
				r: {},
			},
		},
		visibility: {"": "flex", md: "flex", lg: "flex"},
	},
};

export default columnConfig;

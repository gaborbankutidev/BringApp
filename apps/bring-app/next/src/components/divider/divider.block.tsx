import {divider, type DividerProps} from "@/components/divider";
import {colorOptions} from "@/editor/utils/options";
import {
	booleanAttributeSource,
	numberAttributeSource,
	stringAttributeSource,
	type BlockConfig,
} from "@bring/blocks-editor";

const dividerConfig: BlockConfig<DividerProps> = {
	...divider,
	description: "Divider helps to apply up white space between blocks.",
	attributes: {
		withLine: booleanAttributeSource(),
		lineColor: stringAttributeSource(),
		height: numberAttributeSource(),
	},
	previewAttributes: {
		withLine: true,
		height: 200,
	},
	Controls: [
		{
			panel: "Divider settings",
			controls: [
				{
					type: "range",
					label: "Height (in px)",
					path: "height",
					min: 0,
					max: 1200,
					defaultValue: 40,
				},

				{type: "checkbox", label: "With line", path: "withLine"},
				{
					type: "select",
					label: "Line color",
					path: "lineColor",
					options: colorOptions,
					defaultValue: "primary",
					show: "withLine",
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
		visibility: {"": "flex", md: "flex", lg: "flex"},
	},
};

export default dividerConfig;

import background from "@/components/background/background.wp"
import { alignOptions, directionOptions, justifyOptions } from "@/editor/utils/options"
import {
	booleanAttributeSource,
	objectAttributeSource,
	type BlockConfig,
} from "@bring/blocks-editor/blocks"
import { flex, type FlexBlockProps } from "./flex.block"
import { FlexEdit, flexEditContainerClassName, flexEditWrapperClassName } from "./flex.edit"

const { backgroundAttributes, backgroundControls } = background({
	defaultBackgroundColor: "transparent",
})

export const flexConfig: BlockConfig<FlexBlockProps> = {
	...flex,
	title: "Flex (Group)",
	icon: "align-center",
	attributes: {
		colSpan: objectAttributeSource(),
		rowSpan: objectAttributeSource(),
		gap: objectAttributeSource(),
		direction: objectAttributeSource(),
		justify: objectAttributeSource(),
		align: objectAttributeSource(),
		dark: booleanAttributeSource(),
		...backgroundAttributes,
	},
	Edit: FlexEdit,
	editWrapperClassName: flexEditWrapperClassName,
	editContainerClassName: flexEditContainerClassName,
	Controls: [
		{
			panel: "Grid settings",
			controls: [
				{
					type: "responsive-range",
					label: "Column span",
					path: "colSpan",
					min: 1,
					max: 12,
					defaultValue: { "": 1 },
				},
				{
					type: "responsive-range",
					label: "Row span",
					path: "rowSpan",
					min: 1,
					max: 12,
					defaultValue: { "": 1 },
				},
			],
			initialOpen: true,
		},
		{
			panel: "Flex setting",
			controls: [
				{
					type: "responsive-select",
					path: "direction",
					label: "Direction",
					options: directionOptions,
					defaultValue: { "": "col" },
				},
				{
					type: "responsive-select",
					path: "justify",
					label: "Justify",
					options: justifyOptions,
					defaultValue: { "": "start" },
				},
				{
					type: "responsive-select",
					path: "align",
					label: "Align",
					options: alignOptions,
					defaultValue: { "": "start" },
				},
				{
					type: "responsive-range",
					label: "Gap",
					path: "gap",
					min: 0,
					max: 64,
					defaultValue: { "": 4 },
				},
				{
					type: "toggle",
					label: "Dark",
					path: "dark",
				},
			],
			initialOpen: true,
		},
		...backgroundControls,
	],
}

export default flexConfig

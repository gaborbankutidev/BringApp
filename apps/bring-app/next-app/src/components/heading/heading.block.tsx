import { heading, type HeadingBlockProps as HeadingProps } from "@/components/heading"
import { colorOptions, textAlignOptions, textSourceOptions } from "@/editor/utils/options"
import {
	numberAttributeSource,
	stringAttributeSource,
	type BlockConfig,
} from "@bring/blocks-editor"

const headingConfig: BlockConfig<HeadingProps> = {
	...heading,
	title: "Heading",
	description: "Heading block",
	icon: "heading",
	attributes: {
		source: stringAttributeSource("manual"),
		title: stringAttributeSource("Title"),
		level: numberAttributeSource(),
		align: stringAttributeSource(),
		color: stringAttributeSource(),
	},
	Controls: [
		{
			controls: [
				{
					type: "select",
					label: "Source",
					path: "source",
					options: textSourceOptions,
					setDefault: false,
				},
			],
		},
		{
			panel: "Heading settings",
			controls: [
				{
					type: "textarea",
					label: "Title",
					path: "title",
					show: ({ source = "manual" }) => source === "manual",
				},
				{
					type: "range",
					label: "Level",
					path: "level",
					min: 1,
					max: 6,
					defaultValue: 2,
				},
				{
					type: "select",
					label: "Align",
					path: "align",
					options: textAlignOptions,
					defaultValue: "left",
				},
				{
					type: "select",
					label: "Color",
					path: "color",
					options: colorOptions,
					defaultValue: "primary",
				},
			],
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
		visibility: { "": "block", md: "block", lg: "block" },
	},
}

export default headingConfig

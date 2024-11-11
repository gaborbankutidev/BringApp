import {
	section,
	type SectionBlockProps as SectionProps,
} from "@/components/layout/section";
import {colorOptions} from "@/editor/utils/options";
import {
	booleanAttributeSource,
	imageAttributeSource,
	stringAttributeSource,
	type BlockConfig,
} from "@bring/blocks-editor";
import {SectionEdit} from "./section.edit";

const sectionConfig: BlockConfig<SectionProps> = {
	...section,
	title: "Section",
	icon: "align-center",
	allowedBlocks: ["bring/row"],
	attributes: {
		backgroundColor: stringAttributeSource(),
		backgroundImage: imageAttributeSource(),
		dark: booleanAttributeSource(),
	},
	Edit: SectionEdit,
	Controls: [
		{
			panel: "Section settings",
			controls: [
				{
					type: "select",
					label: "Background color",
					path: "backgroundColor",
					options: colorOptions,
				},
				{type: "image", label: "Background image", path: "backgroundImage"},
				{type: "toggle", label: "Dark", path: "dark"},
			],
			initialOpen: true,
		},
	],
	styles: {
		spacing: {
			p: {
				t: {"": 8},
				b: {"": 8},
			},
		},
		visibility: {"": "block", md: "block", lg: "block"},
	},
};

export default sectionConfig;

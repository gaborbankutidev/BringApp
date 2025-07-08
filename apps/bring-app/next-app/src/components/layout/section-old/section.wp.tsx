import { colorOptions } from "@/editor/utils/options"
import {
	booleanAttributeSource,
	imageAttributeSource,
	objectAttributeSource,
	stringAttributeSource,
	type BlockConfig,
} from "@bring/blocks-editor/blocks"
import { section, type SectionBlockProps } from "./section.block"
import { SectionEdit } from "./section.edit"

const sectionConfig: BlockConfig<SectionBlockProps> = {
	...section,
	title: "Section",
	icon: "align-center",
	allowedBlocks: ["bring/row"],
	attributes: {
		backgroundColor: stringAttributeSource(),
		backgroundImage: imageAttributeSource(),
		dark: booleanAttributeSource(),
		backgroundImageClassName: stringAttributeSource(),
		backgroundClassName: stringAttributeSource(),
		containerClassName: stringAttributeSource(),
		asd: objectAttributeSource(),
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
				{ type: "image", label: "Background image", path: "backgroundImage" },
				{
					type: "responsive-image",
					label: "Responsive background image",
					path: "asd",
				},
				{ type: "toggle", label: "Dark", path: "dark" },
			],
			initialOpen: true,
		},
		{
			panel: "Advanced",
			controls: [
				{
					type: "text",
					label: "Background Image Classes",
					path: "backgroundImageClassName",
				},
				{
					type: "text",
					label: "Background Classes",
					path: "backgroundClassName",
				},
				{ type: "text", label: "Container Classes", path: "containerClassName" },
			],
		},
	],
}

export default sectionConfig

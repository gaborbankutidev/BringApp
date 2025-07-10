import background from "@/components/background/background.wp"
import { containerSizeList } from "@/styles/container"
import {
	booleanAttributeSource,
	stringAttributeSource,
	type BlockConfig,
} from "@bring/blocks-editor/blocks"
import { makeOptions } from "@bring/blocks-editor/controls"
import { section, type SectionBlockProps } from "./section.block"
import { SectionEdit } from "./section.edit"

const { backgroundAttributes, backgroundControls } = background({
	defaultBackgroundColor: "transparent",
	withParallax: true,
	withGradient: true,
})

const sectionConfig: BlockConfig<SectionBlockProps> = {
	...section,
	title: "Section",
	icon: "align-center",
	attributes: {
		containerSize: stringAttributeSource(),
		dark: booleanAttributeSource(),
		...backgroundAttributes,
	},
	Edit: SectionEdit,
	Controls: [
		{
			panel: "Section settings",
			controls: [
				{
					type: "select",
					label: "Container Size",
					path: "containerSize",
					options: makeOptions(containerSizeList),
					defaultValue: "1520",
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

export default sectionConfig

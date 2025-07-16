import background from "@/components/background/background.wp"
import type { BlockConfig } from "@bring/blocks-editor/blocks"
import { booleanAttributeSource, objectAttributeSource } from "@bring/blocks-editor/blocks"
import { grid, type GridBlockProps } from "./grid.block"
import { GridEdit, gridEditContainerClassName } from "./grid.edit"

const { backgroundAttributes, backgroundControls } = background({
	defaultBackgroundColor: "transparent",
	withParallax: true,
	withGradient: true,
})

const gridConfig: BlockConfig<GridBlockProps> = {
	...grid,
	title: "Grid",
	icon: "align-center",
	attributes: {
		columnCount: objectAttributeSource(),
		gap: objectAttributeSource(),
		dark: booleanAttributeSource(),
		...backgroundAttributes,
	},
	Edit: GridEdit,
	editContainerClassName: gridEditContainerClassName,
	Controls: [
		{
			panel: "Grid settings",
			controls: [
				{
					type: "responsive-range",
					label: "Column count",
					path: "columnCount",
					min: 1,
					max: 12,
					defaultValue: { "": 1, lg: 2 },
				},
				{
					type: "responsive-range",
					label: "Gap",
					path: "gap",
					min: 0,
					max: 64,
					step: (value) => (value < 12 ? 1 : value < 16 ? 2 : 4),
					defaultValue: { "": 8 },
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

export default gridConfig

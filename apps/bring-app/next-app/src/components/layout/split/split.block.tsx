import { split, type SplitProps } from "@/components/layout/split"
import type { BlockConfig } from "@bring/blocks-editor"
import { objectAttributeSource } from "@bring/blocks-editor"
import { SplitControls } from "./split.controls"
import { SplitEdit } from "./split.edit"

const splitConfig: BlockConfig<SplitProps> = {
	...split,
	title: "Split",
	icon: "align-center",
	attributes: {
		columnCount: objectAttributeSource(),
		gap: objectAttributeSource(),
	},
	Edit: SplitEdit,
	Controls: [{ panel: "Split settings", controls: [SplitControls], initialOpen: true }],
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
		visibility: { "": "grid", md: "grid", lg: "grid" },
	},
}

export default splitConfig

import type { BlockControl } from "@bring/blocks-editor/blocks"
import { ResponsiveRangeControl } from "@bring/blocks-editor/controls"
import type { SplitBlockProps } from "./split.block"

export const SplitControls: BlockControl<SplitBlockProps> = () => (
	<>
		<ResponsiveRangeControl<SplitBlockProps>
			label="Column count"
			path="columnCount"
			min={1}
			max={12}
			defaultValue={{ "": 1 }}
		/>
		<ResponsiveRangeControl<SplitBlockProps>
			label="Gap"
			path="gap"
			min={0}
			max={64}
			defaultValue={{ "": 2 }}
		/>
	</>
)

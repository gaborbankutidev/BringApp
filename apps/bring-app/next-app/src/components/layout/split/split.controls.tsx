import type { SplitProps } from "@/components/layout/split"
import type { BlockControl } from "@bring/blocks-editor"
import { ResponsiveRangeControl } from "@bring/blocks-editor"

export const SplitControls: BlockControl<SplitProps> = () => (
	<>
		<ResponsiveRangeControl<SplitProps>
			label="Column count"
			path="columnCount"
			min={1}
			max={12}
			defaultValue={{ "": 1 }}
		/>
		<ResponsiveRangeControl<SplitProps>
			label="Gap"
			path="gap"
			min={0}
			max={64}
			defaultValue={{ "": 2 }}
		/>
	</>
)

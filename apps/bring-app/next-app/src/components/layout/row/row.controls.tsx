import type { BlockControl } from "@bring/blocks-editor/blocks"
import { ResponsiveRangeControl } from "@bring/blocks-editor/controls"
import type { RowBlockProps } from "./row.block"

export const RowControls: BlockControl<RowBlockProps> = () => (
	<>
		<ResponsiveRangeControl<RowBlockProps>
			label="Column count"
			path="columnCount"
			min={1}
			max={12}
		/>
		<ResponsiveRangeControl<RowBlockProps> label="Gap" path="gap" min={0} max={64} />
	</>
)

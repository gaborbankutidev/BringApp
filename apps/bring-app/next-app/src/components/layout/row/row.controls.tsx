import type { RowBlockProps as RowProps } from "@/components/layout/row"
import type { BlockControl } from "@bring/blocks-editor"
import { ResponsiveRangeControl } from "@bring/blocks-editor"

export const RowControls: BlockControl<RowProps> = () => (
	<>
		<ResponsiveRangeControl<RowProps> label="Column count" path="columnCount" min={1} max={12} />
		<ResponsiveRangeControl<RowProps> label="Gap" path="gap" min={0} max={64} />
	</>
)

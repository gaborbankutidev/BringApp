import {ResponsiveRangeControl, type BlockControl} from "@bring/blocks-editor";

import type {ColumnBlockProps} from "@/components/layout/column";

export const ColumnControls: BlockControl<ColumnBlockProps> = () => (
	<>
		<ResponsiveRangeControl<ColumnBlockProps>
			label="Column span"
			path="colSpan"
			min={1}
			max={12}
		/>
		<ResponsiveRangeControl<ColumnBlockProps>
			label="Row span"
			path="rowSpan"
			min={0}
			max={64}
		/>
		<ResponsiveRangeControl<ColumnBlockProps>
			label="Gap"
			path="gap"
			min={0}
			max={64}
		/>
	</>
);

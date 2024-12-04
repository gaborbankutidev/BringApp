import {BlockControl} from "@bring/blocks-editor/blocks";
import {ResponsiveRangeControl} from "@bring/blocks-editor/controls";
import type {ColumnBlockProps} from "./column.block";

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

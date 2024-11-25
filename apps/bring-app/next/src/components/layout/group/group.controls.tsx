import {ResponsiveRangeControl, type BlockControl} from "@bring/blocks-editor";
import type {GroupBlockProps} from "./group.block";

const GroupControls: BlockControl<GroupBlockProps> = () => (
	<>
		<ResponsiveRangeControl<GroupBlockProps>
			label="Gap"
			path="gap"
			min={0}
			max={64}
			defaultValue={{"": 4}}
		/>
	</>
);

export default GroupControls;

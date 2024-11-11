import {ResponsiveRangeControl, type BlockControl} from "@bring/blocks-editor";

import type {GroupProps} from "@/components/layout/group";

const GroupControls: BlockControl<GroupProps> = () => (
	<>
		<ResponsiveRangeControl<GroupProps>
			label="Gap"
			path="gap"
			min={0}
			max={64}
			defaultValue={{"": 4}}
		/>
	</>
);

export default GroupControls;

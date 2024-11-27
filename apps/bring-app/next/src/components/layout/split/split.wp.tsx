import type {BlockConfig} from "@bring/blocks-editor";
import {objectAttributeSource} from "@bring/blocks-editor";
import {split, type SplitBlockProps} from "./split.block";
import {SplitControls} from "./split.controls";
import {SplitEdit} from "./split.edit";

const splitConfig: BlockConfig<SplitBlockProps> = {
	...split,
	title: "Split",
	icon: "align-center",
	attributes: {
		columnCount: objectAttributeSource(),
		gap: objectAttributeSource(),
	},
	Edit: SplitEdit,
	Controls: [{panel: "Split settings", controls: [SplitControls], initialOpen: true}],
};

export default splitConfig;

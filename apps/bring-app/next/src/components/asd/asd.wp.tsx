import {type BlockConfig} from "@bring/blocks-editor";
import {asd, type AsdBlockProps} from "./asd.block";

const asdConfig: BlockConfig<AsdBlockProps> = {
	...asd,
	title: "Asd",
	attributes: {},

	Controls: [],
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
		visibility: {"": "flex", md: "flex", lg: "flex"},
	},
};

export default asdConfig;

import {numberAttributeSource, stringAttributeSource, type BlockConfig} from "@bring/blocks-editor";
import {embed, type EmbedBlockProps} from "./embed.block";

const embedConfig: BlockConfig<EmbedBlockProps> = {
	...embed,
	title: "Embed",
	description: "Embeds a video or other content from a url.",
	attributes: {
		url: stringAttributeSource(),
		height: numberAttributeSource(),
	},
	Controls: [
		{
			panel: "Embed settings",
			controls: [
				{type: "textarea", label: "Url", path: "url"},
				{
					type: "range",
					label: "Height (in pixels)",
					path: "height",
					defaultValue: 400,
				},
			],
			initialOpen: true,
		},
	],
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
		visibility: {"": "block", md: "block", lg: "block"},
	},
};

export default embedConfig;

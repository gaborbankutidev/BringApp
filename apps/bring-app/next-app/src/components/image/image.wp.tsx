import { sourceOptions } from "@/editor/utils/options"
import {
	booleanAttributeSource,
	imageAttributeSource,
	objectAttributeSource,
	stringAttributeSource,
	type BlockConfig,
} from "@bring/blocks-editor/blocks"
import { image, type ImageBlockProps } from "./Image.block"

const imageConfig: BlockConfig<ImageBlockProps> = {
	...image,
	title: "Image",
	icon: "format-image",
	attributes: {
		contentSource: stringAttributeSource("manual"),
		image: imageAttributeSource(),
		imageClassName: stringAttributeSource(),
		caption: stringAttributeSource(),
		captionClassName: stringAttributeSource(),
		source: stringAttributeSource(),
		sourceClassName: stringAttributeSource(),
		link: objectAttributeSource({}),
		lightbox: booleanAttributeSource(),
	},
	Controls: [
		{
			controls: [
				{
					type: "select",
					label: "Content source",
					path: "contentSource",
					options: sourceOptions,
					setDefault: false,
				},
			],
		},
		{
			panel: "Image settings",
			controls: [
				{ type: "image", label: "Image", path: "image" },
				{ type: "text", label: "Caption", path: "caption" },
				{ type: "text", label: "Source", path: "source" },
				{ type: "toggle", label: "Open in lightbox", path: "lightbox" },
				{
					type: "text",
					label: "Url",
					path: "link.href",
					show: (attributes) => !attributes.lightbox,
				},
				{
					type: "toggle",
					label: "New tab",
					path: "link.newTab",
					show: (attributes) => !attributes.lightbox,
				},
			],
			show: (attributes) => attributes.contentSource === "manual",
			initialOpen: true,
		},
		{
			panel: "Advanced",
			controls: [
				{ type: "text", label: "Image ClassName", path: "imageClassName" },
				{ type: "text", label: "Caption ClassName", path: "captionClassName" },
				{ type: "text", label: "Source ClassName", path: "sourceClassName" },
			],
		},
	],
}

export default imageConfig

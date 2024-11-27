import {sourceOptions} from "@/editor/utils/options";
import {
	booleanAttributeSource,
	imageAttributeSource,
	makeOptions,
	stringAttributeSource,
	type BlockConfig,
} from "@bring/blocks-editor";
import {image, sizes, type ImageBlockProps} from "./image.block";

const sizeList = Object.keys(sizes);
const sizeOptions = makeOptions([...sizeList]);

const imageConfig: BlockConfig<ImageBlockProps> = {
	...image,
	title: "Image",
	icon: "format-image",
	attributes: {
		contentSource: stringAttributeSource("manual"),
		image: imageAttributeSource(),
		size: stringAttributeSource(),
		caption: stringAttributeSource(),
		source: stringAttributeSource(),
		link: stringAttributeSource(),
		newTab: booleanAttributeSource(),
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
				{type: "image", label: "Image", path: "image"},
				{
					type: "select",
					label: "Size",
					path: "size",
					options: sizeOptions,
					defaultValue: "900",
				},
				{type: "text", label: "Caption", path: "caption"},
				{type: "text", label: "Source", path: "source"},
				{type: "toggle", label: "Open in lightbox", path: "lightbox"},
				{
					type: "text",
					label: "Url",
					path: "link",
					show: (attributes) => !attributes.lightbox,
				},
				{
					type: "toggle",
					label: "New tab",
					path: "newTab",
					show: (attributes) => !attributes.lightbox && !!attributes.link,
				},
			],
			show: (attributes) => attributes.contentSource === "manual",
		},
	],
};

export default imageConfig;

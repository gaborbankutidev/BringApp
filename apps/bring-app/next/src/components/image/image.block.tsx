import {image, imageSizes, type ImageBlockProps} from "@/components/image";
import {sourceOptions} from "@/editor/utils";
import {
	booleanAttributeSource,
	imageAttributeSource,
	makeOptions,
	stringAttributeSource,
	type BlockConfig,
} from "@bring/blocks-editor";

const sizeList = Object.keys(imageSizes);
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
	styles: {
		spacing: {
			p: {
				t: {},
				b: {},
				l: {},
				r: {},
			},
			m: {
				t: {},
				b: {},
				l: {},
				r: {},
			},
		},
		visibility: {"": "block", md: "block", lg: "block"},
	},
};

export default imageConfig;

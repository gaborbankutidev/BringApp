import {
	markdown,
	markdownElements,
	type MarkdownBlockProps as MarkdownProps,
} from "@/components/markdown";
import {
	alignOptions,
	colorOptions,
	textSourceOptions,
} from "@/editor/utils/options";
import {
	objectAttributeSource,
	stringAttributeSource,
	type BlockConfig,
} from "@bring/blocks-editor";
import MarkdownEdit from "./markdown.edit";
import {contentSample} from "./sample-content";

const markdownConfig: BlockConfig<MarkdownProps> = {
	...markdown,
	title: "Markdown",
	description: "Markdown block is a simple text editor with markdown support",
	attributes: {
		source: stringAttributeSource("manual"),
		content: stringAttributeSource(contentSample),
		elementsClassName: objectAttributeSource({}),
		align: stringAttributeSource(),
		color: stringAttributeSource(),
	},
	Edit: MarkdownEdit,
	Controls: [
		{
			controls: [
				{
					type: "select",
					label: "Source",
					path: "source",
					options: textSourceOptions,
					setDefault: false,
				},
			],
		},
		{
			panel: "Markdown settings",
			initialOpen: true,
			controls: [
				{
					type: "select",
					label: "Align",
					path: "align",
					options: alignOptions,
				},
				{
					type: "select",
					label: "Color",
					path: "color",
					options: colorOptions,
				},
			],
		},
		{
			panel: "Elements css class(es)",
			controls: markdownElements.map((element) => ({
				type: "text",
				label: element,
				path: `elementsClassName.${element}`,
			})),
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

export default markdownConfig;

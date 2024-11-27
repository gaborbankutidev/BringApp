import {alignOptions, colorOptions, textSourceOptions} from "@/editor/utils/options";
import {objectAttributeSource, stringAttributeSource, type BlockConfig} from "@bring/blocks-editor";
import {markdownElements} from "./markdown";
import {markdown, type MarkdownBlockProps} from "./markdown.block";
import MarkdownEdit from "./markdown.edit";
import {contentSample} from "./sample-content";

const markdownConfig: BlockConfig<MarkdownBlockProps> = {
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
};

export default markdownConfig;

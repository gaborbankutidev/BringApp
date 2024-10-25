import {button, type ButtonBlockProps} from "@/components/button";
import {
	booleanAttributeSource,
	makeOptions,
	stringAttributeSource,
	type BlockConfig,
} from "@bring/blocks-editor";

const buttonConfig: BlockConfig<ButtonBlockProps> = {
	...button,
	title: "Button",
	description: "A simple button",
	attributes: {
		text: stringAttributeSource("Click here"),
		href: stringAttributeSource("#"),
		variant: stringAttributeSource(),
		size: stringAttributeSource(),
		newTab: booleanAttributeSource(),
	},
	Controls: [
		{
			panel: "Settings",
			controls: [
				{type: "text", label: "Text", path: "text", setDefault: false},
				{type: "text", label: "Url", path: "href", setDefault: false},
				{type: "toggle", label: "New tab", path: "newTab"},
				{
					type: "select",
					label: "Variant",
					path: "variant",
					options: makeOptions(["contained", "outlined", "text"]),
					defaultValue: "contained",
				},
				{
					type: "select",
					label: "Size",
					path: "size",
					options: makeOptions(["sm", "md"]),
					defaultValue: "md",
				},
			],
			initialOpen: true,
		},
	],
};

export default buttonConfig;

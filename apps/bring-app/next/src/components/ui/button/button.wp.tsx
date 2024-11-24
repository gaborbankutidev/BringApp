import {
	booleanAttributeSource,
	makeOptions,
	stringAttributeSource,
	type BlockConfig,
} from "@bring/blocks-editor";
import {button, type ButtonBlockProps} from "./button.block";

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
					options: makeOptions([
						"primary",
						"destructive",
						"outline",
						"secondary",
						"ghost",
						"link",
					]),
					defaultValue: "primary",
				},
				{
					type: "select",
					label: "Size",
					path: "size",
					options: makeOptions(["sm", "md", "lg", "icon"]),
					defaultValue: "md",
				},
			],
			initialOpen: true,
		},
	],
};

export default buttonConfig;

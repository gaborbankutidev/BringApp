import {
	contactForm,
	type ContactFormBlockProps,
} from "@/components/forms/contact";
import {stringAttributeSource, type BlockConfig} from "@bring/blocks-editor";

const contactFormConfig: BlockConfig<ContactFormBlockProps> = {
	...contactForm,
	attributes: {
		title: stringAttributeSource(),
		button: stringAttributeSource(),
	},
	Controls: [
		{
			panel: "Settings",
			controls: [
				{type: "text", label: "Form title", path: "title"},
				{type: "text", label: "Submit button label", path: "button"},
			],
			initialOpen: true,
		},
	],
};

export default contactFormConfig;

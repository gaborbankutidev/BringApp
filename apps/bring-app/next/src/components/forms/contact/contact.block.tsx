import {type ContactFormBlockProps} from "@/components/forms/contact";
import {stringAttributeSource, type BlockConfig} from "@bring/blocks-editor";

const buttonConfig: BlockConfig<ContactFormBlockProps> = {
	Component: ({title, button}: ContactFormBlockProps) => (
		<div>
			<div>Form title: {title}</div>
			<div>Submit button label: {button}</div>
		</div>
	),
	componentName: "ContactForm",
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

export default buttonConfig;

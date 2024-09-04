import Button from "@/components/button";
import {
	contactForm,
	type ContactFormBlockProps,
} from "@/components/forms/contact";
import Heading from "@/components/heading";
import {stringAttributeSource, type BlockConfig} from "@bring/blocks-editor";
import {BiEnvelope, BiUser} from "react-icons/bi";
import {twJoin} from "tailwind-merge";
import {Checkbox, Input, Textarea} from "../components";

const contactFormConfig: BlockConfig<ContactFormBlockProps> = {
	...contactForm,
	title: "Contact form",
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
	// This is just a mockup of the form, it doesn't actually submit anything
	Edit: () => (
		<form className="flex flex-col gap-6">
			<Heading level={2} className="mb-8">
				Contact form
			</Heading>
			<Input label="Name*" placeholder="John Doe" icon={BiUser} />
			<Input
				label="E-mail address*"
				placeholder="john_doe@gmail.com"
				icon={BiEnvelope}
			/>
			<Textarea label="Message (optional)" placeholder="Start typing here..." />
			<Checkbox label="I accept the privacy policy*" />
			<div className="text-11 text-right text-grey-800">*Required fields</div>
			<Button as="button" className={twJoin("mt-7 w-full")}>
				Submit
			</Button>
		</form>
	),
};

export default contactFormConfig;

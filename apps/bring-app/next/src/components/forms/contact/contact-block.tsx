import {type BP} from "@/bring";
import {twJoin} from "@/utils";
import ContactForm from "./contact";

export type ContactFormBlockProps = {title?: string; button?: string};

const ContactFormBlock = ({
	title,
	button,
	bringStylesClassNames,
	className = "",
	id,
}: BP<ContactFormBlockProps>) => {
	const classNames = twJoin(bringStylesClassNames?.classNames, className);

	return (
		<ContactForm title={title} button={button} className={classNames} id={id} />
	);
};

export const contactForm = {
	Component: ContactFormBlock,
	componentName: "ContactForm",
};

export default ContactFormBlock;

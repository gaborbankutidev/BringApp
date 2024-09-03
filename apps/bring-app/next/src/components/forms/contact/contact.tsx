"use client";

import {useWPSendForm} from "@/bring/client";
import {twJoin} from "@/utils";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {BiEnvelope, BiLoader, BiPaperPlane, BiUser} from "react-icons/bi";
import {z} from "zod";

import {type BP} from "@/bring";
import Button from "@/components/button";
import Heading from "@/components/heading";
import {Checkbox, Input, Textarea} from "../components";

const contactFormValidation = z.object({
	name: z.string().min(1, "Név megadása kötelező").max(120),
	email: z.string().email("Email megadása kötelező").max(120),
	message: z.string().max(500, "Maximum 500 karakter megengedett").optional(),
	consent: z.boolean().refine(Boolean, {
		message: "Az adatkezelési tájékoztató elfogadása kötelező",
	}),
});

type ContactFormPayload = z.infer<typeof contactFormValidation>;

export type ContactFormProps = {
	title?: string;
	button?: string;
} & React.HTMLProps<HTMLDivElement>;

const ContactForm = ({title, button = "Send", ...props}: ContactFormProps) => {
	const [isSubmitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");
	const [isSuccess, setSuccess] = useState(false);

	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<ContactFormPayload>({
		resolver: zodResolver(contactFormValidation),
		defaultValues: {
			name: "",
			email: "",
			message: "",
			consent: false,
		},
		resetOptions: {
			keepDirtyValues: true,
		},
	});

	const {send} = useWPSendForm<ContactFormPayload>("contact");

	const onSubmit = async (values: ContactFormPayload) => {
		setError("");
		setSuccess(false);
		setSubmitting(true);

		try {
			await send(values);
			setSuccess(true);
		} catch {
			setError("Szerver hiba. Kérjük próbálja meg később.");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div {...props}>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
				{title && (
					<Heading level={2} className="mb-8">
						{title}
					</Heading>
				)}
				<Input
					{...register("name")}
					label="Név*"
					error={errors.name?.message}
					placeholder="John Doe"
					icon={BiUser}
				/>
				<Input
					{...register("email")}
					label="E-mail cím*"
					error={errors.email?.message}
					placeholder="john_doe@gmail.com"
					icon={BiEnvelope}
				/>
				<Textarea
					{...register("message")}
					label="Üzenet (opcionális)"
					error={errors.message?.message}
					placeholder="Küldj üzenetet számunkra"
				/>
				<Checkbox
					{...register("consent")}
					id="consent"
					label="Elfogadom az adatkezelési tájékoztatót*"
					error={errors.consent?.message}
				/>

				<div className="text-11 text-right text-grey-800">*Kötelező mezők</div>

				<Button
					as="button"
					className={twJoin(
						"mt-7 w-full",
						isSubmitting && "opacity-50 hover:bg-brick",
					)}
					disabled={isSubmitting}
				>
					{isSubmitting ? (
						<div className="flex items-center gap-4">
							<BiLoader size={20} className="animate-spin text-orange" />
							<span>Küldés...</span>
						</div>
					) : (
						<div className="flex items-center gap-4">
							<span className="pt-0.5">{button}</span>
							<BiPaperPlane size={20} />
						</div>
					)}
				</Button>
			</form>
			{!error && <p className="mt-6 text-brick">{error}</p>}
			{isSuccess && (
				<p className="mt-6 font-bold text-orange-300">
					Az üzenet sikeresen elküldve.
				</p>
			)}
		</div>
	);
};

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
	componentName: "bring/contact-form",
} as const;

export default ContactForm;

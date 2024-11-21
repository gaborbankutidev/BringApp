"use client";

import {UseSendFormOptions, useSendForm} from "./use-send-form";

/**
 * Custom hook for sending form data to a WordPress endpoint.
 *
 * @param wpURL - The URL of the WordPress site.
 * @returns A function that can be used to send form data and the state of the form submission.
 *
 * @template SuccessT - The type of the success response.
 * @template ErrorT - The type of the error response.
 * @template FormDataPayloadT - The type of the form data payload.
 */
export const makeUseWPSendForm = (wpURL?: string) => {
	const defaultFormUrl = `${wpURL ?? ""}/wp-json/bring/form/submit`;

	return <SuccessT, ErrorT, FormDataPayloadT>(
		formName: string,
		options?: {formUrl?: string} & UseSendFormOptions<
			SuccessT,
			ErrorT,
			{formName: string; formData: FormDataPayloadT}
		>,
	) => {
		const {formUrl = defaultFormUrl, ...sendFormOptions} = options || {};

		const {sendAsync, ...rest} = useSendForm<
			SuccessT,
			ErrorT,
			{formName: string; formData: FormDataPayloadT}
		>(formUrl, sendFormOptions);

		return {
			send: (formData: FormDataPayloadT) => sendAsync({formName, formData}),
			...rest,
		};
	};
};

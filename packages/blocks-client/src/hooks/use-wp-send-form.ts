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
		options?: UseSendFormOptions<
			SuccessT,
			ErrorT,
			{formName: string; formData: FormDataPayloadT}
		> & {
			formUrl?: string;
		},
	) => {
		const formUrl = options?.formUrl ?? defaultFormUrl;

		// Destructure the `useSendForm` result to separate `sendAsync` from other properties
		const {sendAsync, ...rest} = useSendForm<
			SuccessT,
			ErrorT,
			{formName: string; formData: FormDataPayloadT}
		>(formUrl, options);

		return {
			send: (formData: FormDataPayloadT) => sendAsync({formName, formData}),
			...rest,
		};
	};
};

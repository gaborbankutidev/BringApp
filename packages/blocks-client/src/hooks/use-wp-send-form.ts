"use client";

import {UseSendFormOptions, useSendForm} from "./use-send-form";

/**
 * Custom hook for sending form data to a WordPress endpoint.
 *
 * @param wpURL - The URL of the WordPress site.
 * @returns A function that can be used to send form data and the state of the form submission.
 *
 * @template PayloadT - The type of the form data payload.
 */
export const makeUseWPSendForm = (wpURL?: string | undefined) => {
	const defaultFormUrl = `${wpURL ?? ""}/wp-json/bring/form/submit`;

	return <PayloadT>(
		formName: string,
		options?: UseSendFormOptions<
			{success: true; message: string},
			{success: false; message: string},
			{formName: string; formData: PayloadT}
		> & {
			formUrl?: string;
		},
	) => {
		const useSendFormResult = useSendForm<
			{success: true; message: string},
			{success: false; message: string},
			{formName: string; formData: PayloadT}
		>(options?.formUrl ?? defaultFormUrl, options);
		const send = async (formData: PayloadT) => {
			useSendFormResult.send({formName, formData});
		};
		return {
			send,
			state: useSendFormResult.state,
		};
	};
};

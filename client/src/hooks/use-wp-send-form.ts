"use client";

import {UseSendFormOptions, useSendForm} from "./use-send-form";

export const makeUseWPSendForm = (formUrl?: string | undefined) => {
	const defaultFormUrl = `${formUrl ?? ""}/wp-json/bring/form/submit`;

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

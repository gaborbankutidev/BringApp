import {useSendForm} from "./use-send-form";

export const useWPSendForm = <PayloadT>(
	formName: string,
	options?: {
		formUrl?: string;
	},
) => {
	const useSendFormResult = useSendForm<
		{success: true; message: string},
		{success: false; message: string},
		{formName: string; formData: PayloadT}
	>(options?.formUrl ?? "/wp-json/bring-form/submit");
	const send = async (formData: PayloadT) => {
		useSendFormResult.send({formName, formData});
	};
	return {
		send,
		state: useSendFormResult.state,
	};
};

"use client";

import {useState} from "react";

export type FormState = "loading" | "success" | "error" | "idle";

type LoadingState = {
	state: "loading";
};
type SuccessState<SuccessT> = {
	state: "success";
	data: SuccessT;
};
type ErrorState<ErrorT> = {
	state: "error";
	error: ErrorT;
};
type IdleState = {
	state: "idle";
};

type FetchState<SuccessT, ErrorT> =
	| LoadingState
	| SuccessState<SuccessT>
	| ErrorState<ErrorT>
	| IdleState;

export type UseSendFormOptions<SuccessT, ErrorT, PayloadT> = {
	onSuccess?: ((data: SuccessT, payload: PayloadT) => void) | undefined;
	onError?: ((error: ErrorT, payload: PayloadT) => void) | undefined;
};

export const useSendForm = <SuccessT, ErrorT, PayloadT>(
	url: string,
	options?: UseSendFormOptions<SuccessT, ErrorT, PayloadT> | undefined,
) => {
	const [state, setState] = useState<FetchState<SuccessT, ErrorT>>({
		state: "idle",
	});

	const send = async (formData: PayloadT) => {
		setState({
			state: "loading",
		});

		const res = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(formData),
		});

		if (res.ok === true) {
			const resBody = (await res.json()) as SuccessT;
			setState({
				state: "success",
				data: resBody,
			});
			options?.onSuccess !== undefined && options.onSuccess(resBody, formData);
		} else {
			const resError = (await res.json()) as ErrorT;
			setState({
				state: "error",
				error: resError,
			});
			options?.onError !== undefined && options.onError(resError, formData);
		}
	};

	return {state, send};
};

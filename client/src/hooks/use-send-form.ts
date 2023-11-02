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

export const useSendForm = <SuccessT, ErrorT, PayloadT>(formUrl: string) => {
	const [state, setState] = useState<FetchState<SuccessT, ErrorT>>({
		state: "idle",
	});

	const send = async (formData: PayloadT) => {
		setState({
			state: "loading",
		});

		const res = await fetch(formUrl, {
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
		} else {
			const resError = (await res.json()) as ErrorT;
			setState({
				state: "error",
				error: resError,
			});
		}
	};

	return {state, send};
};

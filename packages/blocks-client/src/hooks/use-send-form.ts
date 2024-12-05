"use client"

import { useState } from "react"

/**
 * Represents the possible states of the form submission.
 */
export type FormState = "loading" | "success" | "error" | "idle"

/**
 * Represents the loading state of the form submission.
 * @property state - The current state of the form submission.
 */
type LoadingState = {
	state: "loading"
}

/**
 * Represents the success state of the form submission.
 * @template SuccessT - The type of the success response.
 * @property state - The current state of the form submission.
 * @property data - The success response data.
 */
type SuccessState<SuccessT> = {
	state: "success"
	data: SuccessT
}

/**
 * Represents the error state of the form submission.
 * @template ErrorT - The type of the error response.
 * @property state - The current state of the form submission.
 */
type ErrorState<ErrorT> = {
	state: "error"
	error: ErrorT
}

/**
 * Represents the idle state of the form submission.
 * @property state - The current state of the form submission.
 */
type IdleState = {
	state: "idle"
}

/**
 * Represents the possible states of the form submission.
 * @template SuccessT - The type of the success response.
 * @template ErrorT - The type of the error response.
 */
type FetchState<SuccessT, ErrorT> =
	| LoadingState
	| SuccessState<SuccessT>
	| ErrorState<ErrorT>
	| IdleState

/**
 * Represents the configuration options for the useSendForm hook.
 * @template SuccessT - The type of the success response.
 * @template ErrorT - The type of the error response.
 * @template PayloadT - The type of the form data payload.
 * @property onSuccess - The callback function to handle success responses.
 * @property onError - The callback function to handle error responses.
 */
export type UseSendFormOptions<SuccessT, ErrorT, PayloadT> = {
	onSuccess?: ((data: SuccessT, payload: PayloadT) => void) | undefined
	onError?: ((error: ErrorT, payload: PayloadT) => void) | undefined
}

/**
 * Custom hook for sending form data to a specified URL.
 * @param url - The URL to send the form data to.
 * @param options - Optional configuration options for handling success and error callbacks.
 * @returns An object containing the current state and a function to send the form data.
 */
export const useSendForm = <SuccessT, ErrorT, PayloadT>(
	url: string,
	options?: UseSendFormOptions<SuccessT, ErrorT, PayloadT> | undefined
) => {
	/**
	 * Represents the current state of the form submission.
	 */
	const [state, setState] = useState<FetchState<SuccessT, ErrorT>>({
		state: "idle",
	})

	/**
	 * Sends the form data to the specified URL.
	 * @param formData - The form data to send.
	 */
	const send = async (formData: PayloadT) => {
		setState({
			state: "loading",
		})

		const res = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(formData),
		})

		if (res.ok === true) {
			const resBody = (await res.json()) as SuccessT
			setState({
				state: "success",
				data: resBody,
			})
			options?.onSuccess !== undefined && options.onSuccess(resBody, formData)
		} else {
			const resError = (await res.json()) as ErrorT
			setState({
				state: "error",
				error: resError,
			})
			options?.onError !== undefined && options.onError(resError, formData)
		}
	}

	return { state, send }
}

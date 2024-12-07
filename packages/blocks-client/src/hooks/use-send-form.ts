"use client"

import { useState } from "react"

/**
 * Possible states of the form submission.
 */
type Status = "idle" | "loading" | "error" | "success"

/**
 * Represents the configuration options for the useSendForm hook.
 * @template SuccessT - The type of the success response.
 * @template ErrorT - The type of the error response.
 * @template PayloadT - The type of the form data payload.
 * @property onSuccess - The callback function to handle success responses.
 * @property onError - The callback function to handle error responses.
 */
export type UseSendFormOptions<SuccessT, ErrorT, PayloadT> = {
	onSuccess?: (data: SuccessT, payload: PayloadT) => void
	onError?: (error: ErrorT | Error, payload: PayloadT) => void
	onSettled?: (
		data: SuccessT | undefined,
		error: ErrorT | Error | undefined,
		payload: PayloadT
	) => void
}

/**
 * Custom hook for sending form data to a specified URL.
 * @param url - The URL to send the form data to.
 * @param options - Optional configuration options for handling success and error callbacks.
 * @returns An object containing the current state and a function to send the form data.
 */
export const useSendForm = <SuccessT, ErrorT, PayloadT>(
	url: string,
	options?: UseSendFormOptions<SuccessT, ErrorT, PayloadT>
) => {
	/**
	 * Form submission state.
	 */
	const [status, setStatus] = useState<Status>("idle")
	const [data, setData] = useState<SuccessT | undefined>(undefined)
	const [error, setError] = useState<Error | ErrorT | undefined>(undefined)

	/**
	 * Sends the form data to the specified URL.
	 * @param formData - The form data to send.
	 */
	const sendAsync = async (payload: PayloadT): Promise<void> => {
		setStatus("loading")
		setError(undefined)

		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(payload),
			})

			if (response.ok) {
				const resultData = (await response.json()) as SuccessT
				setData(resultData)
				options?.onSuccess?.(resultData, payload)
				setStatus("success")
			} else {
				const errorData = (await response.json()) as ErrorT
				setError(errorData)
				options?.onError?.(errorData, payload)
				setStatus("error")
			}
		} catch (err) {
			const caughtError = err as Error
			setError(caughtError)
			options?.onError?.(caughtError, payload)
			setStatus("error")
		} finally {
			options?.onSettled?.(data, error, payload)
		}
	}

	/**
	 * Function to reset the form state
	 */
	const reset = () => {
		setStatus("idle")
		setData(undefined)
		setError(undefined)
	}

	return {
		sendAsync,
		status,
		data,
		error,
		isIdle: status === "idle",
		isLoading: status === "loading",
		isSuccess: status === "success",
		isError: status === "error",
		reset,
	}
}

import {Mutex} from "async-mutex";
import {getSession, signOut} from "next-auth/react";
import {refreshAccessToken} from "./auth";

type ApiRequestOptions = RequestInit & {
	headers?: HeadersInit;
};

export type Session = {
	accessToken: string;
	refreshToken: string;
	accessTokenExpires?: number;
	error?: string;
};

const apiMutex = new Mutex();

/**
 * Centralized API request function with token management.
 * @param url - The API endpoint URL.
 * @param options - Fetch options including headers.
 * @returns Fetch API Response object.
 */
export async function apiRequest(
	url: string,
	options: ApiRequestOptions = {},
): Promise<Response> {
	// Lock the mutex for concurrent requests
	await apiMutex.acquire();

	// Retrieve the current session and token
	const session = (await getSession()) as Session | null;
	const token = session?.accessToken;

	try {
		// Make the initial request
		const res = await fetch(url, {
			...options,
			headers: {
				...options.headers,
				Authorization: `Bearer ${token}`,
			},
		});

		// Handle unauthorized response
		if (res.status === 401) {
			// Attempt to refresh the token
			const newSession = await refreshAccessToken(session!);

			if ("error" in newSession && newSession.error) {
				// Sign out the user if refresh fails
				await signOut();
				throw new Error("Session expired. Please log in again.");
			}

			// Retry the original request with the refreshed token
			const retryRes = await fetch(url, {
				...options,
				headers: {
					...options.headers,
					Authorization: `Bearer ${newSession.accessToken}`,
				},
			});

			return retryRes;
		}

		// Return the response if no issues
		return res;
	} finally {
		// Release the mutex after the request is completed
		apiMutex.release();
	}
}

import type {Session} from "@/lib/api";

interface RefreshedTokens {
	token: string;
	exp: number;
	refresh_token?: string;
}

/**
 * Refresh the access token using the centralized API request function.
 * @param session - Current session containing tokens.
 * @returns Updated session with refreshed tokens or an error message.
 */
export async function refreshAccessToken(session: Session): Promise<Session> {
	try {
		const res = await fetch("/wp-json/jwt-auth/v1/token/refresh", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				refresh_token: session.refreshToken,
			}),
		});

		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(errorData.message || "Failed to refresh token");
		}

		const refreshedTokens: RefreshedTokens = await res.json();

		// Update session with new tokens
		return {
			...session,
			accessToken: refreshedTokens.token,
			accessTokenExpires: refreshedTokens.exp,
			refreshToken: refreshedTokens.refresh_token ?? session.refreshToken, // Use new refresh token if provided
		};
	} catch (error) {
		console.error("Error refreshing access token:", error);
		return {...session, error: "RefreshAccessTokenError"};
	}
}

// TODO - logout function

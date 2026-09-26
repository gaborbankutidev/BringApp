import { env } from "@/env.mjs"

export type WpStatus = "ok" | "not-set-up" | "plugin-not-activated" | "unavailable" | "error"

export const getWpStatus = async (): Promise<WpStatus> => {
	let wpStatus: WpStatus = "ok"

	// Check if WordPress site is running and set up
	try {
		const res = await fetch(`${env.NEXT_PUBLIC_WP_BASE_URL}/wp-json/`)
		if (res.status === 200 && res.redirected && res.url.includes("/wp-admin/install.php")) {
			console.error("WordPress not set up")
			return "not-set-up"
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		console.error("WordPress health check failed, make sure the WordPress site is running")
		return "unavailable"
	}

	// Check if WordPress plugin is activated
	try {
		const healthcheckResponse = await fetch(
			`${env.NEXT_PUBLIC_WP_BASE_URL}/wp-json/bring/healthcheck`
		)
		const contentType = healthcheckResponse.headers.get("content-type")

		if (healthcheckResponse.status !== 200 || !contentType?.includes("application/json")) {
			console.error("WordPress plugin not activated")
			return "plugin-not-activated"
		}

		const data = (await healthcheckResponse.json()) as { ok?: boolean }
		if (!("ok" in data) || data.ok !== true) {
			console.error("WordPress plugin not activated")
			return "plugin-not-activated"
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		console.error("WordPress health check failed while checking if WordPress plugin is activated")
		wpStatus = "error"
	}

	return wpStatus
}

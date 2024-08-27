import {env} from "@/env.mjs";

export type WpStatus =
	| "ok"
	| "not-set-up"
	| "theme-not-activated"
	| "unavailable"
	| "error";

export const getWpStatus = async (): Promise<WpStatus> => {
	console.log("Checking WordPress status...");
	let wpStatus: WpStatus = "ok";

	// Check if WordPress site is running
	try {
		await fetch(`${env.NEXT_PUBLIC_WP_BASE_URL}/wp-json/`, {cache: "no-store"});
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		console.error(
			"WordPress health check failed while checking if WordPress site is running",
		);
		return "unavailable";
	}

	try {
		const res = await fetch(`${env.NEXT_PUBLIC_WP_BASE_URL}/wp-json/`, {
			cache: "no-store",
		});
		if (
			res.status === 200 &&
			res.redirected &&
			res.url.includes("/wp-admin/install.php")
		) {
			console.error("WordPress not set up");
			return "not-set-up";
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		console.error(
			"WordPress health check failed while checking if WordPress is set up",
		);
		wpStatus = "error";
	}

	// Check if WordPress theme is activated
	try {
		const res = await fetch(
			`${env.NEXT_PUBLIC_WP_BASE_URL}/wp-json/bring/healthcheck`,
			{cache: "no-store"},
		);
		if (res.status !== 200) {
			console.error("WordPress theme not activated");
			return "theme-not-activated";
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		console.error(
			"WordPress health check failed while checking if WordPress theme is activated",
		);
		wpStatus = "error";
	}

	// If no specific errors were found, and status is still "ok"
	if (wpStatus === "ok") {
		console.log("WordPress is active and set up");
	}

	return wpStatus;
};

export type WpStatus = "ok" | "error" | "not-set-up" | "theme-not-activated";

export const getWpStatus = async (): Promise<WpStatus> => {
	console.log("Checking WordPress status...");

	// check if WordPress is set up
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_WP_BASE_URL}/`);
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
		return "error";
	}

	// check if WordPress site is running
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_WP_BASE_URL}/wp-json/`);

		if (res.status !== 200) {
			console.error("WordPress site not running");
			return "error";
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		console.error(
			"WordPress health check failed while checking if WordPress site is running",
		);
		return "error";
	}

	// check if WordPress theme is activated
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_WP_BASE_URL}/wp-json/bring/healthcheck`,
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
		return "error";
	}

	console.log("WordPress is active and set up");
	return "ok";
};

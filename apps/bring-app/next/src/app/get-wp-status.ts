export type WpStatus = "ok" | "error" | "not-set-up" | "theme-not-activated";

export const getWpStatus = async (): Promise<WpStatus> => {
	try {
		const tryBaseUrl = await fetch(`${process.env.NEXT_PUBLIC_WP_BASE_URL}/`);
		if (
			tryBaseUrl.status === 200 &&
			tryBaseUrl.redirected &&
			tryBaseUrl.url.includes("/wp-admin/install.php")
		) {
			console.error("WordPress not set up");
			return "not-set-up";
		}

		const tryHealthCheckUrl = await fetch(
			`${process.env.NEXT_PUBLIC_WP_BASE_URL}/wp-json/bring/healthcheck`,
		);

		if (tryHealthCheckUrl.redirected || tryHealthCheckUrl.status === 500) {
			console.error("WordPress theme not activated");
			return "theme-not-activated";
		}

		if (tryHealthCheckUrl.status !== 200) {
			console.error("WordPress error", tryHealthCheckUrl);
			return "error";
		}

		return "ok";
	} catch (e) {
		console.error("WordPress health check failed", e);
		return "error";
	}
};

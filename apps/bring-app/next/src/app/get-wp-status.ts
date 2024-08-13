export const getWpStatus = async () => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_WP_BASE_URL}/wp-json/bring/healthcheck`,
		);

		if (res.status !== 200) {
			return false;
		}

		return true;
	} catch (e) {
		console.error("WordPress health check failed", e);
		return false;
	}
};

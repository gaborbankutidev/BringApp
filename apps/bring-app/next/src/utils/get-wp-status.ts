export type Result<T, E = undefined> =
	| {ok: true; value: T}
	| {ok: false; error: E | undefined};

export const Ok = <T>(data?: T): Result<T, never> => {
	return {ok: true, value: data ?? (undefined as never)};
};

export const Err = <E>(error?: E): Result<never, E> => {
	return {ok: false, error};
};

export class WPError extends Error {
	constructor() {
		super("WordPress error");
	}
}

export class WPNotSetUpError extends Error {
	constructor() {
		super("WordPress not set up");
	}
}

export class WPNotRunningError extends Error {
	constructor() {
		super("WordPress not running");
	}
}

export class WPThemeNotActivatedError extends Error {
	constructor() {
		super("WordPress theme not activated");
	}
}

const isRunning = async () => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_WP_BASE_URL}/wp-json/`);
		return res.status === 200;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		throw new WPNotRunningError();
	}
};

const isSetUp = async () => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_WP_BASE_URL}/`);
		return !res.url.includes("/wp-admin/install.php");
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		throw new WPNotSetUpError();
	}
};

const isThemeActivated = async () => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_WP_BASE_URL}/wp-json/bring/healthcheck`,
		);
		return res.status === 200;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		throw new WPThemeNotActivatedError();
	}
};

export const getWpStatus = async () => {
	console.log("checking wordpress status...");

	try {
		if (!(await isRunning())) {
			throw new WPNotRunningError();
		}

		if (!(await isSetUp())) {
			throw new WPNotSetUpError();
		}

		if (!(await isThemeActivated())) {
			throw new WPThemeNotActivatedError();
		}
	} catch (e) {
		console.error(e);
		return Err(e);
	}

	console.log("wordpress is up and running");
	return Ok();
};

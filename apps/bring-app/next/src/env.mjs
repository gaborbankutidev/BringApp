import {createEnv} from "@t3-oss/env-nextjs";
import {z} from "zod";

export const env = createEnv({
	/**
	 * Specify your server-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars.
	 */
	server: {
		NODE_ENV: z.enum(["development", "test", "production"]),
		DATA_TOKEN: z.string().min(8),
	},

	/**
	 * Specify your client-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars. To expose them to the client, prefix them with
	 * `NEXT_PUBLIC_`.
	 */
	client: {
		NEXT_PUBLIC_WP_BASE_URL: z.string(),

		NEXT_PUBLIC_SENTRY_DSN: z.string().min(1).optional(),
		NEXT_PUBLIC_SENTRY_ENV: z
			.enum(["development", "staging", "production"])
			.optional(),
	},

	/**
	 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
	 * middlewares) or client-side so we need to destruct manually.
	 */
	runtimeEnv: {
		// server
		NODE_ENV: process.env.NODE_ENV,
		DATA_TOKEN: process.env.DATA_TOKEN,
		// client
		NEXT_PUBLIC_WP_BASE_URL: process.env.NEXT_PUBLIC_WP_BASE_URL,
		NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
		NEXT_PUBLIC_SENTRY_ENV: process.env.NEXT_PUBLIC_SENTRY_ENV,
	},
	/**
	 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
	 * This is especially useful for Docker builds.
	 */
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	/**
	 * Makes it so that empty strings are treated as undefined.
	 * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
	 */
	emptyStringAsUndefined: true,
});
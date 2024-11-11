import {env} from "@/env.mjs";
import * as Sentry from "@sentry/nextjs";

Sentry.init({
	enabled: process.env.NODE_ENV === "production",
	dsn: env.NEXT_PUBLIC_SENTRY_DSN,
	environment: env.NEXT_PUBLIC_SENTRY_ENV ?? "development",
	integrations: [
		Sentry.replayIntegration({maskAllText: true, blockAllMedia: true}),
	],
	tracesSampleRate: 1.0,
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1.0,
	debug: false,
});

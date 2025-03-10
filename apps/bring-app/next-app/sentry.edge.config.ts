import { env } from "@/env.mjs"
import * as Sentry from "@sentry/nextjs"

Sentry.init({
	enabled: env.NODE_ENV === "production",
	dsn: env.NEXT_PUBLIC_SENTRY_DSN,
	environment: env.NEXT_PUBLIC_SENTRY_ENV ?? "development",
	tracesSampleRate: 1.0,
	debug: false,
})

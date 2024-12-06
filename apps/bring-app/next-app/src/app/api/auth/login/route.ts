import {env} from "@/env.mjs";
import {noop} from "@/utils/noop";
import {add} from "date-fns";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";
import {tryPromise} from "ruts";
import {z} from "zod";
import {zfd} from "zod-form-data";
import {fromZodError} from "zod-validation-error";

const LoginBodySchema = zfd.formData({
	username: zfd.text(),
	password: zfd.text(),
});

const WpSuccessResponseSchema = z.object({
	status: z.number(),
	data: z.object({
		token: z.string(),
	}),
});

const WpErrorResponseSchema = z.object({
	status: z.number(),
	error: z.string(),
});

const WP_LOGIN_ENDPOINT = `${env.NEXT_PUBLIC_WP_BASE_URL}/wp-json/bring/auth/login`;

const errorResponse = (error: string, status = 500) =>
	NextResponse.json(
		{
			status,
			error,
		},
		{
			status,
		},
	);

/**
 * Logs unexpected wordpress errors
 */
const log = (arg: unknown) => {
	env.NODE_ENV === "production"
		? noop(arg) // TODO: Add proper logging for prod (probably sentry)
		: console.log(arg);
};

export async function POST(request: Request) {
	const bodyResult = await tryPromise(request.formData());

	if (bodyResult.isErr) {
		return errorResponse(bodyResult.value.toString(), 400);
	}

	const parsedBodyResult = LoginBodySchema.safeParse(bodyResult.value);

	if (!parsedBodyResult.success) {
		return errorResponse(fromZodError(parsedBodyResult.error).toString(), 400);
	}

	const parsedBody = parsedBodyResult.data;

	const wpResponse = await tryPromise(
		fetch(WP_LOGIN_ENDPOINT, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(parsedBody),
		}),
	);

	if (wpResponse.isErr) {
		return errorResponse(wpResponse.value.toString(), 500);
	}

	const wpBodyResult = await tryPromise(
		wpResponse.value.json() as Promise<unknown>,
	);

	if (wpBodyResult.isErr) {
		log({error: wpBodyResult.value.toString()});
		return errorResponse("Internal server error", 500);
	}

	if (!wpResponse.value.ok) {
		const wpParsedBodyResult = WpErrorResponseSchema.safeParse(
			wpBodyResult.value,
		);

		if (!wpParsedBodyResult.success) {
			log({error: fromZodError(wpParsedBodyResult.error).toString()});
			return errorResponse("Internal server error", 500);
		}

		const wpParsedBody = wpParsedBodyResult.data;

		return errorResponse(wpParsedBody.error, wpParsedBody.status);
	}

	const wpParsedBodyResult = WpSuccessResponseSchema.safeParse(
		wpBodyResult.value,
	);

	if (!wpParsedBodyResult.success) {
		log({error: fromZodError(wpParsedBodyResult.error).toString()});
		return errorResponse("Internal server error", 500);
	}

	const wpParsedBody = wpParsedBodyResult.data;

	(await cookies()).set("bring-auth-token", wpParsedBody.data.token, {
		path: "/",
		httpOnly: true,
		secure: true,
		expires: add(new Date(), {
			days: 30,
		}),
	});

	return NextResponse.json(wpParsedBody);
}

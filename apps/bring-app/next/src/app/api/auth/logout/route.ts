import {sub} from "date-fns";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export function POST() {
	cookies().set("bring-auth-token", "", {
		path: "/",
		httpOnly: true,
		secure: true,
		expires: sub(new Date(), {
			hours: 1,
		}),
	});

	return NextResponse.json({
		status: 200,
		data: {
			success: true,
		},
	});
}

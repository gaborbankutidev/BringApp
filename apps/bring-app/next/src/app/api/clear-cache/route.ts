import {env} from "@/env.mjs";
import {revalidatePath} from "next/cache";
import {NextResponse, type NextRequest} from "next/server";

export const GET = (request: NextRequest) => {
	const {searchParams} = new URL(request.url);
	const token = searchParams.get("token");

	// Error if token is missing or wrong
	if (!token || token !== env.DATA_TOKEN) {
		return NextResponse.json({error: "Wrong or missing token"}, {status: 403});
	}

	revalidatePath("/", "layout");
	return NextResponse.json({message: "Cache cleared!"});
};

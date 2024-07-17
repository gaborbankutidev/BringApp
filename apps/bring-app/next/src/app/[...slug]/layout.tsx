import {Layout, getEntity} from "@/bring/render";
import type {ReactNode} from "react";
import PostLayout from "./post-layout";

const Slug = async ({
	params,
	children,
}: {
	params: {slug: string | string[]};
	children: ReactNode;
}) => {
	const entity = await getEntity(params.slug);

	if (!entity) return null; // TODO: handle this as an Internal Server Error

	if (entity.type === "post" && entity.slug === "post") {
		return <PostLayout slug={params.slug}>{children}</PostLayout>;
	}

	return <Layout slug={params.slug}>{children}</Layout>;
};

export default Slug;

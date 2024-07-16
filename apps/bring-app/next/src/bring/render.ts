import {env} from "@/env.mjs";
import {initRender} from "@bring/blocks-client/init-render";
import {notFound, redirect} from "next/navigation";
import {componentList} from "./list";
import type {EP} from "./types";

export const {getEntity, Main, Layout, Footer} = initRender<EP>(
	env.NEXT_PUBLIC_WP_BASE_URL,
	env.DATA_TOKEN,
	(redirectTo) => {
		redirect(redirectTo);
	},
	() => {
		notFound();
	},
	componentList,
);

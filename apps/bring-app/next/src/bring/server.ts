import {env} from "@/env.mjs";
import {initServer} from "@bring/blocks-client";
import type {EP} from "./types";

export const {getDynamicEntityList, getDynamicEntityProps, getSiteProps} =
	initServer<EP>(env.NEXT_PUBLIC_WP_BASE_URL);

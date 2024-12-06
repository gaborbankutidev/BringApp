import {env} from "@/env.mjs";
import {initServer} from "@bring/blocks-client/init-server";
import type {Menu, MenuItem, SiteProps} from "./types";

/**
 * Initialize Bring App server functions by extending with types and setting the base URL.
 */
export const {getDynamicEntityList, getDynamicEntityProps, getSiteProps} =
	initServer<SiteProps, Menu, MenuItem>(env.NEXT_PUBLIC_WP_BASE_URL);

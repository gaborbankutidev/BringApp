"use client";

import {env} from "@/env.mjs";
import {initClient} from "@bring/blocks-client/init-client";
import type {Menu, MenuItem, SiteProps} from "./types";

/**
 * Initialize Bring App server functions by extending with types and setting the base URL.
 */
export const {useDynamicEntityProps, useWPSendForm} = initClient<SiteProps, Menu, MenuItem>(
	env.NEXT_PUBLIC_WP_BASE_URL,
);
